import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Farmer } from "app/dashboard/farmerinfo";

export const API_URl = "http://139.59.67.91:3100";
@Injectable({
  providedIn: "root"
})
export class MastersService {

  opts = [];

  // vaccination data service
  optcat = [];

  constructor(private http: HttpClient) { }
  
  // Countries opertions

  getCountriesData(): Observable<any[]> {

    return this.http.get<any[]>(`${API_URl}/countries/all`);
  }

  getCountriesDataById(id: string): Observable<any[]> {

    return this.http.get<any[]>(`${API_URl}/countries/${id}`);
  }

 

  
  // states operations

  getStatesData(): Observable<any[]> {

    return this.http.get<any[]>(`${API_URl}/states/all`);
  }

  getStatesDataByID(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URl}/states/${id}`);
  }

  getStatesDataByCountry(id: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${API_URl}/states/getStatesByCountryID/${id}`
    );
  }

 
  // farmer data services

  getFarmerByID(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${API_URl}/EmpList/${id}`);
  }

  getFarmerdata(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URl}/EmpList/all`);
  }
  saveFarmerdata(farmer: Farmer): Observable<any[]> {
    return this.http.post<any[]>(`${API_URl}/EmpList/create`, farmer);
  }



  updateFarmerByID(id: any, updatedFarmer: Farmer): Observable<any[]> {
    return this.http.put<any>(
      `${API_URl}/EmpList/update/${id}`,
      updatedFarmer
    );
  }
  deleteFarmerByID(id: any): Observable<any[]> {
    console.log(id)
    return this.http.delete<any[]>(`${API_URl}/Emplist/delete/${id}`);
  }

 }
