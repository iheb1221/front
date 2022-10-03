import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../../model/Category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/category/all`);
  }

  public addVehicle(category: Category): Observable<any> {
    return this.http.post<Category>(`${this.apiServerUrl}/category/add`, category);
  }


  public updateVehicle(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiServerUrl}/category/update`, category);
  }

  public deleteVehicle(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/category/delete/${categoryId}`);
  }

}
