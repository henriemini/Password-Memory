import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AccountReadService } from '../account-read/account-read.service';
import { environment } from '../../../../environments/environment';
import { Account } from '../../../domain/model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountUpdateService {

  constructor(private http: HttpClient, private accountReadService: AccountReadService) { }

  async update(id: string, account: string): Promise<any>{

    let accountToUpdate: Account = await this.accountReadService.findById(id);


    if(accountToUpdate == null){
      throw new Error('Usuário não encontrado');
    }

    accountToUpdate.account = account;

    console.log(accountToUpdate.account);

    return firstValueFrom(this.http.put<any>(`${environment.api_endpoint}/account/${id}`, accountToUpdate));
  }

  async updatePassword(id: string, oldPassword: string, newPassword: string): Promise<any>{
    let accountToUpdate: Account = await this.accountReadService.findById(id);

    if(accountToUpdate == null){
      throw new Error('Usuário não encontrado');
    }

    if(oldPassword !== accountToUpdate.password){
      throw new Error('Senha invalida');
    }

    let data = {
      password: newPassword
    };

    return firstValueFrom(this.http.put<any>(`${environment.api_endpoint}/account/password/${id}`, data));
  }

}