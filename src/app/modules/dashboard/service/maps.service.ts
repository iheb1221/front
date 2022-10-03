import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vehicle} from "../../../model/vehicleCategory";
import {Maps} from "../../../model/Maps";

@Injectable({
  providedIn: 'root'
})
export class MapsService{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }
  public addMaps(formData: FormData): Observable<any> {
    console.log(formData)
    return this.http.post<Maps>(`${this.apiServerUrl}/maps/add`, formData);
  }
}
