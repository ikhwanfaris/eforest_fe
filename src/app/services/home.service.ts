import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  async totalCountTree() {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get(`${environment.serverUrl}/api/data/total-tree-count`, httpOptions)
      .toPromise();
  }

  getUserToken() {
    return window.localStorage.getItem('eforest_token');
  }

  getUserLang() {
    return !!window.localStorage.getItem('eforest_lang')
      ? window.localStorage.getItem('eforest_lang')
      : 'en';
  }
}
