import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "../model/Reservation";
import {Payment} from "../model/Payment";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) {
  }

  public addReservation(reservation: Reservation): Observable<any> {
    console.log(reservation)
    return this.http.post<any>(`${this.apiServerUrl}/reservation/add`, reservation).pipe()
  }

  public getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiServerUrl}/reservation/all`);
  }

  public addPayment(payment: Payment): Observable<any> {
    console.log(payment)
    return this.http.post<any>(`${this.apiServerUrl}/payment/add`, payment).pipe()
  }

  public getReservationByVehicleId(reservationId: any): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/reservation/findByCarId/` + reservationId)
      .pipe();
  }
  public getReservationByUserId(userId: any): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/reservation/byUserId/` + userId)
      .pipe();
  }
  public deleteReservation(reservationId: any):Observable<any>{
    return this.http.delete<void>(`${this.apiServerUrl}/reservation/delete/${reservationId}`);
  }
}
