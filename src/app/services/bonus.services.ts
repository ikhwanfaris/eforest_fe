import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BonusModel } from '../models/bonus.model';

@Injectable({
  providedIn: 'root',
})
export class BonusService {
  constructor(private http: HttpClient) {}

  async userDirectBonus(page: number, start_date: string, end_date: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get(
        `${environment.serverUrl}/api/bonus/direct-referral?itemsPerPage=20&sortDesc=false&page=` +
          page +
          '&start_date=' +
          start_date +
          '&end_date=' +
          end_date,
        httpOptions
      )
      .toPromise();
  }

  getUserToken() {
    return window.localStorage.getItem('eforest_token');
  }
  getUserDownLine() {
    return window.localStorage.getItem('eforest_user_downline');
  }

  async userTeamBonus(page: number, start_date: string, end_date: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${this.getUserToken()}`,
        'X-Locale': this.getUserLang(),
      }),
    };
    return this.http
      .get(
        `${environment.serverUrl}/api/bonus/team?itemsPerPage=20&sortDesc=false&page=` +
          page +
          '&start_date=' +
          start_date +
          '&end_date=' +
          end_date,
        httpOptions
      )
      .toPromise();
  }

  getUserLang() {
    return !!window.localStorage.getItem('eforest_lang')
      ? window.localStorage.getItem('eforest_lang')
      : 'en';
  }
}
