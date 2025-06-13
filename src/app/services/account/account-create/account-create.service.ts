import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Account } from '../../../domain/model/account';
import { AccountReadService } from '../account-read/account-read.service';

@Injectable({
  providedIn: 'root'
})
export class AccountCreateService {

  constructor(private http: HttpClient, private accountReadService: AccountReadService) { }

  create(account: Account){
        return this.http.post(`${environment.api_endpoint}/account`,account);
  }

  async getNextAccountId(): Promise<string> {
  const accounts: Account[] = await this.accountReadService.findAll();

  if (!accounts || accounts.length === 0) {
    return '1';
  }

  const maxId = Math.max(
    ...accounts
      .filter(acc => acc.id) 
      .map(acc => Number(acc.id))
      .filter(id => !isNaN(id))
  );

  return String(maxId + 1);
}
}