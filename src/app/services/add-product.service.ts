import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApprovalRejectionFormBody, CDRDocRequest, CDR_RequestListResponse, CommentBeforeCompletionFormBody, CreateDocumentRequest, MailSendObj } from '../models/add-product';
import { SimpleResponse } from '../models/simple-response';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private baseUrl: string;
  constructor(private httpClient: HttpClient, private utilityService: UtilityService) { 
    this.baseUrl = environment.baseUrl;
  }
  async CDRMaster_UpdateInsert(cdrObj: CreateDocumentRequest): Promise<SimpleResponse | void> {
    const http$ = await this.httpClient
      .post<SimpleResponse>(`${this.baseUrl}/CDRMaster_UpdateInsert`,cdrObj, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
    return http$;
  }
  async uploadRefDocuments(data: FormData): Promise <SimpleResponse | void> {  
    const http$ = await this.httpClient
    .post<SimpleResponse>(`${this.baseUrl}/UploadReferenceDocumentCDR`,data, {
      headers: new HttpHeaders({
      })
    }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
  return http$;
}  
async GetCdRequestList(): Promise <CDR_RequestListResponse[] | void> {  
  const http$ = await this.httpClient
  .get<CDR_RequestListResponse[]>(`${this.baseUrl}/CreateDocumentRequestList`, {
    headers: new HttpHeaders({
    })
  }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
return http$;
}   

async GetOld1CdRequestList(): Promise <CDR_RequestListResponse[] | void> {  
  const http$ = await this.httpClient
  .get<CDR_RequestListResponse[]>(`${this.baseUrl}/GetOld1DocumentRequestList`, {
    headers: new HttpHeaders({
    })
  }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
return http$;
}  

async GetOld2CdRequestList(): Promise <CDR_RequestListResponse[] | void> {  
  const http$ = await this.httpClient
  .get<CDR_RequestListResponse[]>(`${this.baseUrl}/GetOld2DocumentRequestList`, {
    headers: new HttpHeaders({
    })
  }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
return http$;
}  

async GetSelectedCdRequestList(refId: number): Promise <CDR_RequestListResponse[] | void> {  
  const http$ = await this.httpClient
  .get<CDR_RequestListResponse[]>(`${this.baseUrl}/GetSelectedDocumentRequestList/${refId}`, {
    headers: new HttpHeaders({
    })
  }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
return http$;
}  

async LoadCdRequestDetail(refId: number, cdrDocId: number): Promise <CDRDocRequest | void> {  
  const http$ = await this.httpClient
  .get<CDRDocRequest>(`${this.baseUrl}/LoadCDRDocumentMaster/${refId}/${cdrDocId}`, {
    headers: new HttpHeaders({
    })
  }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
return http$;
}  

async submitRejectionRequest(approvalRejectionFormBody: ApprovalRejectionFormBody): Promise <SimpleResponse | void> {  
  const http$ = await this.httpClient
  .post<SimpleResponse>(`${this.baseUrl}/SubmitRejectionRequest`,approvalRejectionFormBody, {
    headers: new HttpHeaders({
    })
  }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
return http$;
}  

async submitCommentBeforeCompletion(commentBeforeCompletionFormBody: CommentBeforeCompletionFormBody): Promise <SimpleResponse | void> {  
  const http$ = await this.httpClient
  .post<SimpleResponse>(`${this.baseUrl}/SubmitCommentBeforeCompletion`,commentBeforeCompletionFormBody, {
    headers: new HttpHeaders({
    })
  }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
return http$;
}  

async approveRequestByDepttOwner(approvalRejectionFormBody: ApprovalRejectionFormBody): Promise <SimpleResponse | void> {  
  const http$ = await this.httpClient
  .post<SimpleResponse>(`${this.baseUrl}/ApproveRequestByDepttOwner`,approvalRejectionFormBody, {
    headers: new HttpHeaders({
    })
  }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
return http$;
}  

async approveRequestByAssignedDeptt(approvalRejectionFormBody: ApprovalRejectionFormBody): Promise <SimpleResponse | void> {  
  const http$ = await this.httpClient
  .post<SimpleResponse>(`${this.baseUrl}/ApproveRequestByAssignedDeptt`,approvalRejectionFormBody, {
    headers: new HttpHeaders({
    })
  }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
return http$;
}  

async uploadDocuments(data: FormData): Promise <SimpleResponse | void> {  
  const http$ = await this.httpClient
  .post<SimpleResponse>(`${this.baseUrl}/DocumentInsert`,data, {
    headers: new HttpHeaders({
    })
  }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
return http$;
}    

async sendMail(mailSendData: MailSendObj): Promise <SimpleResponse | void> {  
  const http$ = await this.httpClient
  .post<SimpleResponse>(`${this.baseUrl}/sendMail`,mailSendData, {
    headers: new HttpHeaders({
    })
  }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
return http$;
}    

async sendMailBulk(mailSendData: MailSendObj[]): Promise <SimpleResponse | void> {  
  const http$ = await this.httpClient
  .post<SimpleResponse>(`${this.baseUrl}/sendMailBulk`,mailSendData, {
    headers: new HttpHeaders({
    })
  }).pipe().toPromise().catch(err => { this.utilityService.handleError(err) });
return http$;
}    
}
