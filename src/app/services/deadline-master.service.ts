import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DeadlineMaster, DeadlineMasterLoadResponse, DeadlineMasterResponse, DocumentTypeMaster, DocumentTypeMasterLoadResponse, DocumentTypeMasterResponse } from '../models/deadline-master';
import { SimpleResponse } from '../models/simple-response';
import { UtilityService } from './utility.service';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeadlineMasterService {
  private baseUrl: string;
  constructor(private httpClient: HttpClient, private utilityService: UtilityService) { 
    this.baseUrl = environment.baseUrl;
  }

  async downloadReport(startDate: string): Promise<Blob | void> {
    startDate = encodeURIComponent(startDate)
    return await firstValueFrom(this.httpClient.get<Blob>(`${this.baseUrl}/DownloadReport?startDate=${startDate}`, {
      responseType: 'blob' as 'json'
    })).catch(err => { this.utilityService.handleError(err) })
  }

  async getDocumentTypeMasterList(): Promise<DocumentTypeMasterResponse | void> {
    const http$ = await this.httpClient
      .get<DocumentTypeMasterResponse>(`${this.baseUrl}/GetDocumentTypeList`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
    return http$;
  }

  async Update_InsertDocTypeMaster(docTypeObj: DocumentTypeMaster): Promise<SimpleResponse | void> {
    const http$ = await this.httpClient
      .post<SimpleResponse>(`${this.baseUrl}/Update_InsertDocTypeMaster`,docTypeObj, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
    return http$;
  }

  async LoadDocTypeMasterDetails(ID: number): Promise<DocumentTypeMasterLoadResponse | void> {
    const http$ = await this.httpClient
      .get<DocumentTypeMasterLoadResponse>(`${this.baseUrl}/LoadDocTypeMasterDetails/${ID}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
    return http$;
  }


  async getDeadlineMasterList(): Promise<DeadlineMasterResponse | void> {
    const http$ = await this.httpClient
      .get<DeadlineMasterResponse>(`${this.baseUrl}/GetDealineMaster`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
    return http$;
  }
  
  async deleteDeadlineMasterId(deadlineID: number): Promise<SimpleResponse | void> {
    const http$ = await this.httpClient
      .get<SimpleResponse>(`${this.baseUrl}/DeleteDeadlineMasterByID/${deadlineID}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
    return http$;
  }
}
