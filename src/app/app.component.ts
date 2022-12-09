import { Component, OnInit } from '@angular/core';
import { Server } from './models/server.interface';
import { ServersService } from './services/servers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  filter: string;
  newServerName: string;
  appStatus: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable');
    }, 2000);
  });
  servers: Server[] = [];

  constructor(private serversService: ServersService) {}

  ngOnInit(): void {
    this.serversService.getServersHTTP().subscribe((servers) => {
      this.servers = servers;
    });
  }

  getStatusClasses(server: {
    instanceType: string;
    name: string;
    status: string;
    started: Date;
  }) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical',
    };
  }

  onAdd() {
    const newServer = this.serversService.addServerHTTP(this.newServerName);
    this.servers.push(newServer);
    this.newServerName = '';
  }
}
