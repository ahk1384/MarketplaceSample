import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { ApiError } from './models/api-error';

@Injectable()
export class BaseApiService {
  constructor(private http: HttpClient) {}

  private getFullUrl(endpoint: string): string {
    return `${environment.apiBaseUrl}/${endpoint}`;
  }

  public get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(this.getFullUrl(endpoint), { params })
      .pipe(catchError(this.handleError));
  }

  public delete<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.delete<T>(this.getFullUrl(endpoint), { params })
      .pipe(catchError(this.handleError));
  }

  public post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(this.getFullUrl(endpoint), body)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new ApiError(errorMessage, error.status));
  }
}
