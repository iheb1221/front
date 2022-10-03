import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vehicle} from "../../../model/vehicleCategory";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiServerUrl}/vehicle/all`);
  }

  public addVehicle(formData: FormData): Observable<any> {
    console.log(formData)
    return this.http.post<Vehicle>(`${this.apiServerUrl}/vehicle/add`, formData);
  }

  public updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiServerUrl}/vehicle/update`, vehicle);
  }

  public deleteVehicle(VehicleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/vehicle/delete/${VehicleId}`);
  }

  public upload(formData: FormData): Observable<any> {
    console.log(formData)
    return this.http.post<any>(`${this.apiServerUrl}/v1/upload`, formData);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/v1/files`);
  }
}
