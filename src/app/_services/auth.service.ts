import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface AccessTokenResponseModel {
  access_token: string;
  refresh_token?: string;
  user_id?: string;
  device_id?: string;
}

export enum AuthEnum {
  AccessToken = 'access_token',
  RefreshToken = 'refresh_token',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'https://realm.mongodb.com/api/client/v2.0';

  constructor(private http: HttpClient) {}

  async init() {
    console.log('auth init start...');
    if (this.getRefreshToken()) {
      console.log('refresh token', this.getRefreshToken());
      await this.refreshToken().toPromise();
    } else {
      console.log('no token, fetch...');
      await this.requestAccessToken().toPromise();
    }

    console.log('token', this.getAccessToken());
  }

  requestAccessToken(): Observable<AccessTokenResponseModel> {
    return this.http
      .post<AccessTokenResponseModel>(
        `${this.authUrl}/app/data-faytr/auth/providers/api-key/login`,
        {
          key: environment.mongodbApiKey,
        }
      )
      .pipe(
        tap((res) => {
          sessionStorage.setItem(AuthEnum.AccessToken, res.access_token);
          sessionStorage.setItem(AuthEnum.RefreshToken, res.refresh_token);
        })
      );
  }

  refreshToken(): Observable<AccessTokenResponseModel> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getRefreshToken()}`,
    });

    return this.http
      .post<AccessTokenResponseModel>(
        `${this.authUrl}/auth/session`,
        {},
        { headers }
      )
      .pipe(
        tap((res) => {
          sessionStorage.setItem(AuthEnum.AccessToken, res.access_token);
        })
      );
  }

  getAccessToken(): string {
    return sessionStorage.getItem(AuthEnum.AccessToken);
  }

  getRefreshToken(): string {
    return sessionStorage.getItem(AuthEnum.RefreshToken);
  }
}
