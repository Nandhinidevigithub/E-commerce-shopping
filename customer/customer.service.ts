import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
    
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
   
import { Customer } from './icustomer';
    
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
    
  private apiURL = "http://localhost:5275/api";
    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  constructor(private httpClient: HttpClient) { }
    
  getAll(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.apiURL + '/Customers/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  create(Customer: any): Observable<Customer> {
    return this.httpClient.post<Customer>(this.apiURL + '/Customers/', JSON.stringify(Customer), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  find(id: string | number): Observable<Customer> {
    return this.httpClient.get<Customer>(this.apiURL + '/Customers/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id: string | number, Customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(this.apiURL + '/Customers/' + id, JSON.stringify(Customer), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(id: string | number){
    return this.httpClient.delete<Customer>(this.apiURL + '/Customers/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
   
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}