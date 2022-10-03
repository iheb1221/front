import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getNbCars(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/count`)
      .pipe();
  }

  public getNbReservations(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/reservation/count`)
      .pipe();
  }
  public getNbUserActive(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/user/count`)
      .pipe();
  }

  public getNbCitroen(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/Citroen`)
      .pipe();
  }

  public getNbAudi(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/Audi`)
      .pipe();
  }

  public getNbToyota(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/Toyota`)
      .pipe();
  }

  public getNbHyundai(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/Hyundai`)
      .pipe();
  }

  public getNbHonda(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/Honda`)
      .pipe();
  }

  public getNbFiat(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/Fiat`)
      .pipe();
  }

  public getNbBMW(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/BMW`)
      .pipe();
  }

  public getNbLexus(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/Lexus`)
      .pipe();
  }

  public getNbMercedes(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/Mercedes`)
      .pipe();
  }

  public getNbMitsubishi(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/Mitsubishi`)
      .pipe();
  }

  public getNbOpel(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/Opel`)
      .pipe();
  }

  public getNbNissan(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/vehicle/Nissan`)
      .pipe();
  }
}
