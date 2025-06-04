import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserReadService {

  constructor(private http: HttpClient) { }

  findAll() : Promise<any> {

    // para consumir este metodo basta utilizar a palavra chave: await
    // let X = await userReadService.finalAll();
    return firstValueFrom(this.http.get<any>(`${environment.api_endpoint}/user`));0
    }

}
