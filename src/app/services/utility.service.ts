import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public _router: Router) { }

  public static clone<T>(a: T): T {
    return JSON.parse(JSON.stringify(a));
  }

  public handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  public handleErrorResponse(err: HttpErrorResponse) {
    if (err.status == 401) {
      this._router.navigate(['/unauthorized']);
    } else if (err.status == 403) {
      this._router.navigate(['/access-denied']);
    } else {
      console.error(err);
    }
    console.log(err);
  }
}
