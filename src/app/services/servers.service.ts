import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// custom
import { start } from '../../start';
import { Server } from '../models/server.interface';

@Injectable({ providedIn: 'root' })
export class ServersService {
  constructor(private httpClient: HttpClient) {}

  addServerHTTP(newServerName: string) {
    const newServer = {
      instanceType: 'small',
      name: newServerName,
      status: 'stable',
      started: new Date(),
    };

    this.httpClient
      .post(start.fb + '/servers.json', newServer)
      .subscribe((res) => {});

    return newServer;
  }

  getServersHTTP() {
    return this.httpClient
      .get<{ [key: string]: Server }>(start.fb + '/servers.json')
      .pipe(
        map((res) => {
          const servers = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              servers.push({
                ...res[key],
                id: key,
              });
            }
          }
          return servers;
        })
      );
  }
}
