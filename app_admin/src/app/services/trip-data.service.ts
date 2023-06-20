import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Update the import statement
import { Trip } from '../models/trip';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';

@Injectable()
export class TripDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  private createAuthorizationHeader(): HttpHeaders {
    const token = this.storage.getItem('travlr-token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }
  
  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    const headers = this.createAuthorizationHeader();
    return this.http
      .get<Trip[]>(`${this.apiBaseUrl}trips`, { headers })
      .toPromise()
      .catch(this.handleError);
  }
  
  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#getTrip');
    const headers = this.createAuthorizationHeader();
    return this.http
      .get<Trip>(this.tripUrl + tripCode, { headers })
      .toPromise()
      .catch(this.handleError);
  }

  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    const headers = this.createAuthorizationHeader();
    return this.http
      .post<Trip>(this.tripUrl, formData, { headers }) // Use generics to specify the response type
      .toPromise()
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#updateTrip');
    const headers = this.createAuthorizationHeader();
    return this.http
      .put<Trip>(this.tripUrl + formData.code, formData, { headers }) // Use generics to specify the response type
      .toPromise()
      .catch(this.handleError);
  }

  public deleteTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#deleteTrip');
    const headers = this.createAuthorizationHeader();
    return this.http
      .delete<Trip>(this.tripUrl + tripCode, { headers })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post<AuthResponse>(url, user, { headers: this.createAuthorizationHeader() }) // Use generics to specify the response type
      .toPromise()
      .catch(this.handleError);
  }
}
