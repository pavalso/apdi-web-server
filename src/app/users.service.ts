import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
    public username?: string;
    public password?: string;

    constructor(private httpClient : HttpClient) {}

    login(username: string, password: string) {
      return this.httpClient.post(
        "http://auth.apiweb.com/v1/user/login",
        {
          "user": username,
          "hash-pass": CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)
        }
      );
    };
}
