import { Injectable } from '@angular/core';
import { UserCredentialDto } from '../../domain/dto/user-credential-dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(credentials: UserCredentialDto) : Observable<any>{
    console.log('autenticando usuário');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      email: credentials.email,
      password: credentials.password,
    }

    return this.http.post<any>('',body, {headers});
  }

  isAuthenticated(): boolean{

    return false;
  }

}