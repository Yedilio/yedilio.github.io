import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(protected http: HttpClient) {}

  getInfoByIp(ip: string) {
    const api_key = '39d8f8bcc302dd94956eddfb4f195de6';
    return this.http.get(
      'http://api.ipstack.com/' +
        ip +
        '?access_key=' +
        api_key +
        '&language=ru',
      {}
    );
  }

  getCurrentIp() {
    return this.http.get('https://api.ipify.org?format=json');
  }
}
