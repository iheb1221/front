export class LoginData {
  email: string | undefined;
  password: string | undefined;


  constructor(email: string | undefined, password: string | undefined) {
    this.email = email;
    this.password = password;
  }
}
