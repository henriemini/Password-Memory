import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountDeleteService {

  constructor(private http: HttpClient) { }

  delete(id: string){
    return firstValueFrom(this.http.delete(`${environment.api_endpoint}/account/${id}`));
  }
}
