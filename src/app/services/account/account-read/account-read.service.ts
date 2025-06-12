import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Account } from '../../../domain/model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountReadService {

  constructor(private http: HttpClient) { }

  findAll() : Promise<any> {

    // para consumir este metodo basta utilizar a palavra chave: await
    // let X = await userReadService.finalAll();
    return firstValueFrom(this.http.get<any>(`${environment.api_endpoint}/account`));
    }

  findById(id: string): Promise<Account>{
    return firstValueFrom(this.http.get<any>(`${environment.api_endpoint}/account/${id}`));
  }

  findByUsername(username:string): Promise<Account>{
    return firstValueFrom(this.http.get<any>(`${environment.api_endpoint}/account?username=${username}`));
  }

}
