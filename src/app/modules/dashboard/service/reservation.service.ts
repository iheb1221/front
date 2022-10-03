import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "../../../model/Reservation";


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiServerUrl}/reservation/all`);
  }

  public addReservation(reservation: Reservation): Observable<any> {
    return this.http.post<Reservation>(`${this.apiServerUrl}/reservation/add`, reservation);
  }

  public updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiServerUrl}/reservation/update`, reservation);
  }

  public deleteReservation(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${reservationId}`);
  }
}
