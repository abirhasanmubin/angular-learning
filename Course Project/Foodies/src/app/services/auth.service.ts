import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {User} from "../auth/user.model";
import {Router} from "@angular/router";


export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  signupUrl: string
    = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYroLcNUSv3PihR38oy6jk584qb3E8cMo'

  signinUrl: string
    = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYroLcNUSv3PihR38oy6jk584qb3E8cMo'

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

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

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
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
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(newUser));
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
