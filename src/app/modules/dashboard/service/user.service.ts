import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../model/User";
import {UserRequest} from "../../../model/UserRequest";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }

  public getUserById(userId: any): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/getUserById/` + userId)
      .pipe();
  }

  public addUser(user: User): Observable<any> {
    console.log(user)
    return this.http.post<any>(`${this.apiServerUrl}/user/add`, user).pipe();
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user);
  }

  public editProfile(user: UserRequest): Observable<UserRequest> {
    return this.http.put<UserRequest>(`${this.apiServerUrl}/user/edit`, user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
  }
}
