import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/User";
import {environment} from "../../environments/environment";
import {EmailRequest} from "../model/EmailRequest";
import {PasswordRequest} from "../model/PasswordRequest";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) {
  }

  public addUser(user: User): Observable<any> {
    console.log(user)
    return this.http.post<any>(`${this.apiServerUrl}/api/v1/registration`, user).pipe()
  }

  login(loginData: any): Observable<any> {
    let email = loginData.email
    let password = loginData.password
    return this.http.post(this.apiServerUrl + '/api/v1/login', {
      email,
      password
    }, httpOptions);
  }

  forgotPassword(request: EmailRequest): Observable<any> {
    return this.http.post(this.apiServerUrl + '/forgot_password', request, httpOptions)
  }

  resetPassword(resetRequest: PasswordRequest): Observable<any> {
    return this.http.post(this.apiServerUrl + '/reset_password', resetRequest, httpOptions)
  }
  isLoggedIn(){
    return !!localStorage.getItem('ROLE_ADMIN');
  }

}
