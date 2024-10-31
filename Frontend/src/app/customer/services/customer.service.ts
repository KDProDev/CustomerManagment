import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Customer } from '../models/customer.model';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:7143/api/Customers';

  constructor(private http: HttpClient) {}

  getCustomers(pageNumber: number, pageSize: number): Observable<{ customers: Customer[]; total: number }> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{ customers: Customer[]; total: number }>(this.apiUrl, { params }).pipe(
      catchError(error => {
        console.error('Error in getCustomers API call:', error);
        return throwError(error);
      })
    );
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${customer.id}`, customer);
  }

  deleteCustomer(customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${customerId}`);
  }
}
