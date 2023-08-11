import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
    
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
   
import { Category } from './icategory';
    
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    
  private apiURL = "http://localhost:5275/api";
    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  constructor(private httpClient: HttpClient) { }
    
  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiURL +'/Categories/' )
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  create(Category: any): Observable<Category> {
    return this.httpClient.post<Category>(this.apiURL + '/Categories/', JSON.stringify(Category), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  find(id: string | number): Observable<Category> {
    return this.httpClient.get<Category>(this.apiURL + '/Categories/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id: string | number, Category: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.apiURL + '/Categories/' + id, JSON.stringify(Category), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(id: string | number){
    return this.httpClient.delete<Category>(this.apiURL + '/Categories/' + id, this.httpOptions)
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