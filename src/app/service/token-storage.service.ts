import {Injectable} from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() {
  }

  signOut(): void {
    if (window.localStorage.getItem(TOKEN_KEY) !== null) {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem('ROLE_ADMIN');
      window.localStorage.removeItem('ADMIN_ID');

    }
  }
  signOutUser(): void {
    if (window.localStorage.getItem(USER_KEY) !== null) {
      window.localStorage.removeItem(USER_KEY);
      window.localStorage.removeItem('ROLE_USER');
      window.localStorage.removeItem('USER_ID');
    }
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public saveTokenUser(token: string): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  // public saveUser(user: any): void {
  //   window.localStorage.removeItem(USER_KEY);
  //   window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  // }
  //
  // public getUser(): any {
  //   const user = window.localStorage.getItem(USER_KEY);
  //   if (user) {
  //     return JSON.parse(user);
  //   }
  //
  //   return {};
  // }
}
