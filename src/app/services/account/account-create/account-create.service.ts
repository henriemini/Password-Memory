import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Account } from '../../../domain/model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountCreateService {

  constructor(private http: HttpClient) { }

  create(account: Account){
    return this.http.post(`${environment.api_endpoint}/account`,account);
  }
}