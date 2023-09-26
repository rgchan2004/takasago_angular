import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { CDRDocRequest, DocumentRequestList, CDR_RequestListResponse, ApprovalRejectionFormBody, MailSendObj } from '../models/add-product';
import { SimpleResponse } from '../models/simple-response';
import { UserMaster, UserMasterLoadResponse, UserMasterResponse } from '../models/user-master';
import { AddProductService } from '../services/add-product.service';
import { UserMasterService } from '../services/user-master.service';
import { UtilityService } from '../services/utility.service';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-approve-request',
  templateUrl: './approve-request.component.html',
  styleUrls: ['./approve-request.component.css'],
  providers: [DatePipe]
})
export class ApproveRequestComponent {
  isShowSpinner: boolean = false;
  toMailId: string[] = [];
  originatorName: string = "";
  myFiles:string [] = [];
  mailComment: string = "";
  mailSubject: string = "";
  mailFiles:string [] = [];
  cdrDocRequest: CDRDocRequest = <CDRDocRequest>{};
  userMasterData: UserMaster = <UserMaster>{};
  docAttachedByQC: string = "";
  selectedDocToApprove: DocumentRequestList = <DocumentRequestList>{};
  myFiles2QC:string [] = [];
  finalRemark:string = "";
  finalComment:string = "";
  loggedInUser: UserMaster = <UserMaster>{};
  refId: number = 0;
  cdrDocId: number = 0;
  rejectionReason: string = "";
  rejectionRemark: string = "";
  userMasterList: UserMaster[] = [];
  checkedUserMasterList: UserMaster[] = [];
  @ViewChild('myInput')
myInputVariable: ElementRef;
  constructor(private datePipe: DatePipe, private router: Router,private _userService:UserMasterService,
    private _addProdutService: AddProductService,
    private utilityService: UtilityService,
    public activatedRoute: ActivatedRoute) {
      this.activatedRoute.params.subscribe((param : Params) => {
        this.refId = param['id'];
        this.cdrDocId = param['id1'];
    });
  }
  
  ngOnInit(){
    this.selectedDocToApprove = JSON.parse(localStorage?.getItem("selectedDocToApprove") ?? '{}');
    this.loggedInUser = JSON.parse(localStorage?.getItem("loggedInUserData") ?? '{}');
    this.getDocumentRequestData(this.refId,this.cdrDocId);
    this.getUserMasterList();
  }

  getUserMasterList() {
    this._userService.getUserList()
     .then((result: UserMasterResponse | void) => {
       if (result) {
         var response = UtilityService.clone(result);
         this.userMasterList = response.userList;
       }
     })
     .catch((err: HttpErrorResponse) => {
       console.log(err);
       this.utilityService.handleErrorResponse(err);
     });
 }


  getDocumentRequestData (refId: number,cdrDocId: number) {
      this._addProdutService.LoadCdRequestDetail(refId,cdrDocId)
       .then((result: CDRDocRequest | void) => {
         if (result) {
           var response = UtilityService.clone(result);
           this.cdrDocRequest = response;
           this.loadUserDataById(parseInt(this.cdrDocRequest.ReferenceDRNumber))
        }
       })
       .catch((err: HttpErrorResponse) => {
         console.log(err);
         this.utilityService.handleErrorResponse(err);
       });
  }

  async loadUserDataById(userId: number) {
    await this._userService.getUserDataById(userId)
      .then(async (result: UserMasterLoadResponse | void) => {
        if (result) {
          var response = UtilityService.clone(result);
          this.userMasterData = response.userDetails;
          this.toMailId.push(this.userMasterData.emailID);
          this.originatorName = this.userMasterData?.fullName;
        }
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.utilityService.handleErrorResponse(err);
      });
  }
  
  getFileDetails (e: any) {
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }

  getMailFileDetails (e: any) {
    for (var i = 0; i < e.target.files.length; i++) { 
      this.mailFiles.push(e.target.files[i]);
    }
  }

  submitApprovalRequest(value: string){
      if(this.cdrDocRequest?.CDR_SelectedDocumentType?.isApproved == 0 || this.cdrDocRequest?.CDR_SelectedDocumentType?.isApproved == null){
        if(value == "Approve"){
          if(this.selectedDocToApprove?.DocOwner == "1"){
            var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
            approvalRejectionFormBody.CDRID_RefNo = this.refId;
            approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
            approvalRejectionFormBody.isApproved = 1;
            approvalRejectionFormBody.ApprovedBy = 3;
            this.SaveApprovalByDepttOwner(approvalRejectionFormBody, this.selectedDocToApprove);
          }
          else if(this.selectedDocToApprove?.DocOwner == "2"){
            var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
            approvalRejectionFormBody.CDRID_RefNo = this.refId;
            approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
            approvalRejectionFormBody.isApproved = 1;
            approvalRejectionFormBody.ApprovedBy = 11;
            this.SaveApprovalByDepttOwner(approvalRejectionFormBody, this.selectedDocToApprove);
          }
           else if(this.selectedDocToApprove?.DocOwner == "5"){
            var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
            approvalRejectionFormBody.CDRID_RefNo = this.refId;
            approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
            approvalRejectionFormBody.isApproved = 1;
            approvalRejectionFormBody.ApprovedBy = 7;
            this.SaveApprovalByDepttOwner(approvalRejectionFormBody, this.selectedDocToApprove);
          }
          else if(this.selectedDocToApprove?.DocOwner == "4"){
           var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
           approvalRejectionFormBody.CDRID_RefNo = this.refId;
           approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
           approvalRejectionFormBody.isApproved = 1;
           approvalRejectionFormBody.ApprovedBy = 13;
           this.SaveApprovalByDepttOwner(approvalRejectionFormBody, this.selectedDocToApprove);
         }
         else if(this.selectedDocToApprove?.DocOwner == "6"){
          var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
          approvalRejectionFormBody.CDRID_RefNo = this.refId;
          approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
          approvalRejectionFormBody.isApproved = 1;
          approvalRejectionFormBody.ApprovedBy = 15;
          this.SaveApprovalByDepttOwner(approvalRejectionFormBody, this.selectedDocToApprove);
        }
        var filtertedList: UserMaster[] = [];
        filtertedList = this.userMasterList?.filter(x=>x.department.toString() == this.selectedDocToApprove?.AssignedToDeptt);
        if(filtertedList?.length > 0){
          filtertedList.forEach(x=>{
            this.toMailId.push(x.emailID);
          })
        } 
        }
        else if(value == "Reject"){
          if(this.selectedDocToApprove?.DocOwner == "1"){
            var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
            approvalRejectionFormBody.CDRID_RefNo = this.refId;
            approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
            approvalRejectionFormBody.isApproved = 3;
            approvalRejectionFormBody.RejectedBy = 4;
            approvalRejectionFormBody.RejectReason = this.rejectionReason;
            approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
            this.SaveRejectRequest(approvalRejectionFormBody, this.selectedDocToApprove);
          }
          else if(this.selectedDocToApprove?.DocOwner == "2"){
            var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
            approvalRejectionFormBody.CDRID_RefNo = this.refId;
            approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
            approvalRejectionFormBody.isApproved = 3;
            approvalRejectionFormBody.RejectedBy = 12;
            approvalRejectionFormBody.RejectReason = this.rejectionReason;
            approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
            this.SaveRejectRequest(approvalRejectionFormBody, this.selectedDocToApprove);
          }
           else if(this.selectedDocToApprove?.DocOwner == "5"){
            var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
            approvalRejectionFormBody.CDRID_RefNo = this.refId;
            approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
            approvalRejectionFormBody.isApproved = 3;
            approvalRejectionFormBody.RejectedBy = 8;
            approvalRejectionFormBody.RejectReason = this.rejectionReason;
            approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
            this.SaveRejectRequest(approvalRejectionFormBody, this.selectedDocToApprove);
          }
          else if(this.selectedDocToApprove?.DocOwner == "4"){
           var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
           approvalRejectionFormBody.CDRID_RefNo = this.refId;
           approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
           approvalRejectionFormBody.isApproved = 3;
           approvalRejectionFormBody.RejectedBy = 14;
           approvalRejectionFormBody.RejectReason = this.rejectionReason;
           approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
           this.SaveRejectRequest(approvalRejectionFormBody, this.selectedDocToApprove);
         }
         else if(this.selectedDocToApprove?.DocOwner == "6"){
          var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
          approvalRejectionFormBody.CDRID_RefNo = this.refId;
          approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
          approvalRejectionFormBody.isApproved = 3;
          approvalRejectionFormBody.RejectedBy = 16;
          approvalRejectionFormBody.RejectReason = this.rejectionReason;
          approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
          this.SaveRejectRequest(approvalRejectionFormBody, this.selectedDocToApprove);
        }
       var filtertedList: UserMaster[] = [];
       filtertedList = this.userMasterList?.filter(x=>x.department.toString() == this.selectedDocToApprove?.AssignedToDeptt);
       if(filtertedList?.length > 0){
         filtertedList.forEach(x=>{
           this.toMailId.push(x.emailID);
         })
       } 
        }
      }
      else if(this.cdrDocRequest?.CDR_SelectedDocumentType?.isApproved == 1){
        if(value == "Approve"){
          const frmData = new FormData();
          for (var i = 0; i < this.myFiles.length; i++) { 
            frmData.append("myFiles", this.myFiles[i]);
          } 
          this._addProdutService.uploadDocuments(frmData)
           .then((result: SimpleResponse | void) => {
             if (result) {
               var response = UtilityService.clone(result);
               if(response?.msgFlag){
                this.docAttachedByQC = response.message;
                if(this.selectedDocToApprove?.AssignedToDeptt == "1"){
                  var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
                  approvalRejectionFormBody.CDRID_RefNo = this.refId;
                  approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
                  approvalRejectionFormBody.isApproved = 2;
                  approvalRejectionFormBody.FinalApprovedBy = 5;
                  approvalRejectionFormBody.AssignDepttAttachedDocument = this.docAttachedByQC;
                 approvalRejectionFormBody.AssignDepttComment = this.finalComment;
                 approvalRejectionFormBody.AssignDepttRemark = this.finalRemark;
                  this.SaveApprovalByAssignedDeptt(approvalRejectionFormBody, this.selectedDocToApprove);
                }
                else if(this.selectedDocToApprove?.AssignedToDeptt == "4"){
                  var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
                  approvalRejectionFormBody.CDRID_RefNo = this.refId;
                  approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
                  approvalRejectionFormBody.isApproved = 2;
                  approvalRejectionFormBody.FinalApprovedBy = 13;
                  approvalRejectionFormBody.AssignDepttAttachedDocument = this.docAttachedByQC;
                 approvalRejectionFormBody.AssignDepttComment = this.finalComment;
                 approvalRejectionFormBody.AssignDepttRemark = this.finalRemark;
                  this.SaveApprovalByAssignedDeptt(approvalRejectionFormBody, this.selectedDocToApprove);
                }
                 else if(this.selectedDocToApprove?.AssignedToDeptt == "5"){
                  var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
                  approvalRejectionFormBody.CDRID_RefNo = this.refId;
                  approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
                  approvalRejectionFormBody.isApproved = 2;
                  approvalRejectionFormBody.FinalApprovedBy = 9;
                  approvalRejectionFormBody.AssignDepttAttachedDocument = this.docAttachedByQC;
                 approvalRejectionFormBody.AssignDepttComment = this.finalComment;
                 approvalRejectionFormBody.AssignDepttRemark = this.finalRemark;
                  this.SaveApprovalByAssignedDeptt(approvalRejectionFormBody, this.selectedDocToApprove);
                }
                else if(this.selectedDocToApprove?.AssignedToDeptt == "6"){
                 var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
                 approvalRejectionFormBody.CDRID_RefNo = this.refId;
                 approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
                 approvalRejectionFormBody.isApproved = 2;
                 approvalRejectionFormBody.FinalApprovedBy = 1;
                 approvalRejectionFormBody.AssignDepttAttachedDocument = this.docAttachedByQC;
                 approvalRejectionFormBody.AssignDepttComment = this.finalComment;
                 approvalRejectionFormBody.AssignDepttRemark = this.finalRemark;
                 this.SaveApprovalByAssignedDeptt(approvalRejectionFormBody, this.selectedDocToApprove);
               }
               
             }
            }
           })
           .catch((err: HttpErrorResponse) => {
             console.log(err);
             this.utilityService.handleErrorResponse(err);
           });
        
        }
        else if(value == "Reject"){
          if(this.selectedDocToApprove?.DocOwner == "1"){
            var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
            approvalRejectionFormBody.CDRID_RefNo = this.refId;
            approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
            approvalRejectionFormBody.isApproved = 3;
            approvalRejectionFormBody.RejectedBy = 6;
            approvalRejectionFormBody.RejectReason = this.rejectionReason;
           approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
            this.SaveRejectRequest(approvalRejectionFormBody, this.selectedDocToApprove);
          }
          else if(this.selectedDocToApprove?.DocOwner == "4"){
            var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
            approvalRejectionFormBody.CDRID_RefNo = this.refId;
            approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
            approvalRejectionFormBody.isApproved = 3;
            approvalRejectionFormBody.RejectedBy = 14;
            approvalRejectionFormBody.RejectReason = this.rejectionReason;
           approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
            this.SaveRejectRequest(approvalRejectionFormBody, this.selectedDocToApprove);
          }
           else if(this.selectedDocToApprove?.DocOwner == "5"){
            var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
            approvalRejectionFormBody.CDRID_RefNo = this.refId;
            approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
            approvalRejectionFormBody.isApproved = 3;
            approvalRejectionFormBody.RejectedBy = 10;
            approvalRejectionFormBody.RejectReason = this.rejectionReason;
            approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
            this.SaveRejectRequest(approvalRejectionFormBody, this.selectedDocToApprove);
          }
          else if(this.selectedDocToApprove?.DocOwner == "6"){
           var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
           approvalRejectionFormBody.CDRID_RefNo = this.refId;
           approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
           approvalRejectionFormBody.isApproved = 3;
           approvalRejectionFormBody.RejectedBy = 2;
           approvalRejectionFormBody.RejectReason = this.rejectionReason;
           approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
           this.SaveRejectRequest(approvalRejectionFormBody, this.selectedDocToApprove);
         }
    
        }
      }
  }

  SaveApprovalByAssignedDeptt(approvalRejectionFormBody: ApprovalRejectionFormBody, selectedItem: DocumentRequestList){
       this._addProdutService.approveRequestByAssignedDeptt(approvalRejectionFormBody)
      .then((result: SimpleResponse | void) => {
        if (result) {
          var response = UtilityService.clone(result);
          if(response?.msgFlag){
           Swal.fire({
             icon: 'success',
             title: 'CDR Form!',
             text: 'Approved Successfully!',
             confirmButtonColor: '#6259ca'
           })
           if(approvalRejectionFormBody.isApproved == 1 || approvalRejectionFormBody.isApproved == 2){
            var mailObj: MailSendObj = <MailSendObj>{};
            mailObj.sendMailTo = [];
            mailObj.sendMailTo = this.toMailId;
            mailObj.isCustom = false;
            mailObj.message = approvalRejectionFormBody.isApproved == 1 ? "Approved" : approvalRejectionFormBody.isApproved == 2 ? "Attached" : "";
            mailObj.subject = "";
            mailObj.documentRequestNo = selectedItem.CDRID_RefNo;
            mailObj.documentRequestType = selectedItem.TypeOfDocument;
            mailObj.originator = this.originatorName;
            mailObj.statusDate = this.datePipe.transform(new Date(), 'MMM d, y');
            this.mailSentMethod(mailObj);
           }
           this.router.navigate(['/qa-document-list']);
        }
       }
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.utilityService.handleErrorResponse(err);
      });
  }

  SaveApprovalByDepttOwner(approvalRejectionFormBody: ApprovalRejectionFormBody, selectedItem: DocumentRequestList){
       this._addProdutService.approveRequestByDepttOwner(approvalRejectionFormBody)
      .then((result: SimpleResponse | void) => {
        if (result) {
          var response = UtilityService.clone(result);
          if(response?.msgFlag){
           Swal.fire({
             icon: 'success',
             title: 'CDR Form!',
             text: 'Approved Successfully!',
             confirmButtonColor: '#6259ca'
           })
           if(approvalRejectionFormBody.isApproved == 1 || approvalRejectionFormBody.isApproved == 2){
            var mailObj: MailSendObj = <MailSendObj>{};
            mailObj.sendMailTo = [];
            mailObj.sendMailTo = this.toMailId;
            mailObj.isCustom = false;
            mailObj.message = approvalRejectionFormBody.isApproved == 1 ? "Approved" : approvalRejectionFormBody.isApproved == 2 ? "Attached" : "";
            mailObj.subject = "";
            mailObj.documentRequestNo = selectedItem.CDRID_RefNo;
            mailObj.documentRequestType = selectedItem.TypeOfDocument;
            mailObj.originator = this.originatorName;
            mailObj.statusDate = this.datePipe.transform(new Date(), 'MMM d, y');

            this.mailSentMethod(mailObj);
           }
           this.router.navigate(['/qa-document-list']);
        }
       }
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.utilityService.handleErrorResponse(err);
      });
  }

  SaveRejectRequest(approvalRejectionFormBody: ApprovalRejectionFormBody, selectedItem: DocumentRequestList){
       this._addProdutService.submitRejectionRequest(approvalRejectionFormBody)
      .then((result: SimpleResponse | void) => {
        if (result) {
          var response = UtilityService.clone(result);
          if(response?.msgFlag){
           Swal.fire({
             icon: 'success',
             title: 'CDR Form!',
             text: 'Rejected Successfully!',
             confirmButtonColor: '#6259ca'
           })
           if(approvalRejectionFormBody.isApproved == 3)
           {
            var mailObj: MailSendObj = <MailSendObj>{};
            mailObj.sendMailTo = [];
            mailObj.sendMailTo = this.toMailId;
            mailObj.isCustom = false;
            mailObj.message = "Rejected";
            mailObj.subject = "";
            mailObj.documentRequestNo = selectedItem.CDRID_RefNo;
            mailObj.documentRequestType = selectedItem.TypeOfDocument;
            mailObj.originator = this.originatorName;
            mailObj.statusDate = this.datePipe.transform(new Date(), 'MMM d, y');

            this.mailSentMethod(mailObj);
           }
           this.router.navigate(['/qa-document-list']);
        }
       }
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.utilityService.handleErrorResponse(err);
      });
  }

  configureMail(){
    this.getUserMasterList();
  }

  onChangeValue(value: UserMaster){
    if(value?.checked)
    this.checkedUserMasterList.push(value);
    else if(!value?.checked){
      const index: number = this.checkedUserMasterList.indexOf(value);
      if (index !== -1) {
          this.checkedUserMasterList.splice(index, 1);
      }  
    }
  }

  sendMail(){
    var mailObj: MailSendObj = <MailSendObj>{};
    mailObj.sendMailTo = [];
    this.checkedUserMasterList.forEach(x=>{
      mailObj.sendMailTo.push(x.emailID);
    })
    mailObj.isCustom = true;
    mailObj.message = this.mailComment;
    mailObj.subject = this.mailSubject;
    this.mailSentMethod(mailObj);
  }

  mailSentMethod(mailBody: MailSendObj){
    this.isShowSpinner = true;
    this._addProdutService.sendMail(mailBody)
      .then((result: SimpleResponse | void) => {
        if (result) {
          var response = UtilityService.clone(result);
          if(response?.msgFlag){
           Swal.fire({
             icon: 'success',
             title: 'Mail!',
             text: 'Mail Sent Successfully!',
             confirmButtonColor: '#6259ca'
           })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Mail!',
            text: 'Something went wrong!',
            confirmButtonColor: '#6259ca'
          })
        }
        this.mailFiles = [];
        this.checkedUserMasterList = [];
        this.mailComment = "";
        this.mailSubject = "";
        this.toMailId = [];
        this.isShowSpinner = false;
       }
       this.isShowSpinner = false;
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.isShowSpinner = false;
        this.utilityService.handleErrorResponse(err);
      });
  }

  resetMailBody(){
    this.mailFiles = [];
    this.checkedUserMasterList = [];
        this.mailComment = "";
        this.mailSubject = "";
        this.myInputVariable.nativeElement.value = "";
  }
}

