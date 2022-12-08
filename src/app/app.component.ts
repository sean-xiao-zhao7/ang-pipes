import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { start } from '../start';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  servers = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable',
      started: new Date(15, 1, 2017),
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(15, 1, 2017),
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(15, 1, 2017),
    },
    {
      instanceType: 'small',
      name: 'Testing Environment Server',
      status: 'stable',
      started: new Date(15, 1, 2017),
    },
  ];
  filter: string;
  newServerName: string;
  appStatus: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable');
    }, 2000);
  });

  constructor(private httpClient: HttpClient) {}

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
    const newServer = {
      instanceType: 'small',
      name: this.newServerName,
      status: 'stable',
      started: new Date(),
    };
    this.httpClient
      .post(start.fb + '/servers.json', newServer)
      .subscribe((res) => {});
    this.servers.push(newServer);
    this.newServerName = '';
  }
}
