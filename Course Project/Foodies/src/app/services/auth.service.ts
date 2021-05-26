import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "../auth/user.model";


export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new Subject<User>();

  signupUrl: string
    = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYroLcNUSv3PihR38oy6jk584qb3E8cMo'

  signinUrl: string
    = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYroLcNUSv3PihR38oy6jk584qb3E8cMo'

  constructor(
    private http: HttpClient
  ) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.signupUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),
      tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        )
      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.signinUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),
      tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        )
      }));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number,) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const newUser = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(newUser);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'INVALID_EMAIL':
        errorMessage = "The email address is invalid";
        break;
      case 'EMAIL_EXISTS':
        errorMessage = "The email address is already in use by another account.";
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'The Email or Password is incorrect.'
        break;
    }
    return throwError(errorMessage);
  }
}
