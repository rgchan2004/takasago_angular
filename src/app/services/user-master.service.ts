import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SimpleResponse } from '../models/simple-response';
import { UserMaster, UserMasterLoadResponse, UserMasterResponse } from '../models/user-master';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class UserMasterService {
  loggedInUserData: UserMaster = <UserMaster>{};
  public isShowMenu = new BehaviorSubject<UserMaster>(this.loggedInUserData);
  private baseUrl: string;
  constructor(private httpClient: HttpClient, private utilityService: UtilityService) { 
    this.baseUrl = environment.baseUrl;
  }

  async getUserList(): Promise<UserMasterResponse | void> {
    const http$ = await this.httpClient
      .get<UserMasterResponse>(`${this.baseUrl}/GetUserList`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
    return http$;
  }

  async updateUserDetails(userObj: UserMaster): Promise<SimpleResponse | void> {
    const http$ = await this.httpClient
      .post<SimpleResponse>(`${this.baseUrl}/UpdateInsertUserMaster`,userObj, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
    return http$;
  }

  async getUserDataById(userId: number): Promise<UserMasterLoadResponse | void> {
    const http$ = await this.httpClient
      .get<UserMasterLoadResponse>(`${this.baseUrl}/LoadUserDetails/${userId}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
    return http$;
  }

  async deleteUseryId(userId: number): Promise<SimpleResponse | void> {
    const http$ = await this.httpClient
      .get<SimpleResponse>(`${this.baseUrl}/DeleteUserDataByID/${userId}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
    return http$;
  }

  async authenticateUser(emailId: string, password: string): Promise<UserMasterLoadResponse | void> {
    const http$ = await this.httpClient
      .get<UserMasterLoadResponse>(`${this.baseUrl}/userLoggin?emailId=${emailId}&password=${password}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
    return http$;
  }
}
