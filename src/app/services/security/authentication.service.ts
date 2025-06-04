import { Injectable } from '@angular/core';
import { UserCredentialDto } from '../../domain/dto/user-credential-dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  fakeAuthentication: boolean = false;

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

    if(credentials.email === 'iemini@iemini' && credentials.password === 'adm'){
      this.fakeAuthentication = true;
    }
    else{
      this.fakeAuthentication = false;
    }

    //return this.http.post<any>(`http://localhost:8080/authenticate`,body, {headers});
    return this.http.get<any>(`${environment.authentication_api_endpoint}/user/1`); //iemini@iemini adm
  }

  isAuthenticated(): boolean{
    console.log('deu certo?');
    console.log(this.fakeAuthentication);
    return this.fakeAuthentication;
  }

}