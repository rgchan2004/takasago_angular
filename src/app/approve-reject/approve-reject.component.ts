import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ApprovalRejectionFormBody, CDR_Products, CDR_RequestListResponse, DocumentRequestList, MailSendObj, dropdown } from '../models/add-product';
import { SimpleResponse } from '../models/simple-response';
import { UserMaster, UserMasterLoadResponse, UserMasterResponse } from '../models/user-master';
import { AddProductService } from '../services/add-product.service';
import { UserMasterService } from '../services/user-master.service';
import { UtilityService } from '../services/utility.service';

declare var $: any;
@Component({
  selector: 'app-approve-reject',
  templateUrl: './approve-reject.component.html',
  styleUrls: ['./approve-reject.component.css'],
  providers: [DatePipe]
})
export class ApproveRejectComponent {
  countryList: dropdown[] = [];
  productList: CDR_Products[] = [];
  isShowSpinner: boolean = false;
  page: number = 1;
  documentRequestList: DocumentRequestList[] = [];
  selectedItem: DocumentRequestList = <DocumentRequestList>{};
  rejectionReason: string = "";
  rejectionRemark: string = "";
  refId: number = 0;
  cdrDocId: number = 0;
  loggedInUser: UserMaster = <UserMaster>{};
  toMailId: string[] = [];
  originatorName: string = "";
  userMasterList: UserMaster[] = [];
  cdrRequestListResponse: CDR_RequestListResponse[] = [];
  constructor(private datePipe: DatePipe, private router: Router,private _userService:UserMasterService,
    private _addProdutService: AddProductService,
    private utilityService: UtilityService,
    public activatedRoute: ActivatedRoute) {
  }
  
  ngOnInit(){
    this.setCountryData();
    this.loggedInUser = JSON.parse(localStorage?.getItem("loggedInUserData") ?? '{}');
    this.GetCdRequestList();
    this.getUserMasterList();
  }

  setCountryData() {
    this.countryList.push(
      { value: "1", text: "Vietnam" },
      { value: "2", text: "Australia" },
      { value: "3", text: "Myanmar" },
      { value: "4", text: "Thailand" },
      { value: "5", text: "Indonesia" },
      { value: "6", text: "Bangladesh" },
      { value: "7", text: "India" },
      { value: "8", text: "Malaysia" },
      { value: "9", text: "Korea" },
      { value: "10", text: "Philippines" },
      { value: "11", text: "Singapore" },
      { value: "12", text: "China" },
      { value: "13", text: "Pakistan" },
      { value: "14", text: "Japan" },
      { value: "15", text: "Cambodia" },
      { value: "16", text: "New Zealand" },
      { value: "17", text: "United States" },
      { value: "18", text: "Germany" },
      { value: "19", text: "Sri Lanka" },
      { value: "20", text: "Taiwan" },
      { value: "21", text: "Hong Kong" },
      { value: "22", text: "France" },
    )
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
 
  GetCdRequestList() {
    this.isShowSpinner = true;
     this._addProdutService.GetCdRequestList()
      .then((result: CDR_RequestListResponse[] | void) => {
        if (result) {
          var response = UtilityService.clone(result);
          this.cdrRequestListResponse = response;
          this.cdrRequestListResponse.forEach(i=>i.SelDocTypeList.forEach(j=>{
            this.documentRequestList.push({
              CDRID_RefNo : i.CDRID_RefNo,
              SalesPerson : i.SalesPerson,
              ReferenceDrNumber: parseInt(i.ReferenceDRNumber),
              TypeOfDocument : j.CDR_DocumentType,
              dtModified: j.dtModified != "0001-01-01T00:00:00" ? new Date(j.dtModified) : "",
              AssignedToDeptt : j.CDR_AssignToDeptt,
              ProjectNumber : i.ProductList[0].CDR_ProjectNumber,
              CustomerName : i.ProductList[0].CDR_Customer,
              country: i.ProductList[0].CDR_Country,
              labelName: i.ProductList[0].CDR_LabelName,
              perfumerCode: i.ProductList[0].CDR_PerfumeCode,
              Status : j.isApproved,
              isShowLink : false,
              DocOwner: j.DocTypeOwner,
              deadlineDays: j.CDR_Deadline,
              CDR_DocID: j.CDR_DocID,
              createdDate: new Date(j.dtCreated),
              targetDate: j.CDR_Deadline,
              CommentBy: j.CommentBy,
              CommentBeforeCompletion: j.CommentBeforeCompletion
          })
          }))
            this.documentRequestList = this.documentRequestList.filter(x=> (x.DocOwner == this.loggedInUser?.department.toString() && x.Status == 0));
           
          this.isShowSpinner = false;
        }
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.isShowSpinner = false;
        this.utilityService.handleErrorResponse(err);
      });
  }
  
  openMOdal(){
    $('#exampleModal').modal('show');
  }
  
  async loadUserDataById(userId: number) {
    await this._userService.getUserDataById(userId)
      .then(async (result: UserMasterLoadResponse | void) => {
        if (result) {
          var response = UtilityService.clone(result);
          this.toMailId.push(response.userDetails?.emailID);
          this.originatorName = response.userDetails?.fullName;
        }
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.utilityService.handleErrorResponse(err);
      });
  }

  submitRejectRequest(documentRequest: DocumentRequestList, value: string){
    if(value == "Approve"){
      localStorage.setItem('selectedDocToApprove', JSON.stringify(documentRequest));
      this.router.navigate(['/attached-document',documentRequest.CDRID_RefNo,documentRequest.CDR_DocID]);
    }else if(value == "Reject"){
      this.selectedItem = documentRequest;
      this.loadUserDataById(this.selectedItem?.ReferenceDrNumber);
      this.refId = documentRequest.CDRID_RefNo;
      this.cdrDocId = documentRequest.CDR_DocID;
    }
  }

  rejectSubmit(){
    if(this.selectedItem?.Status == 0 || this.selectedItem?.Status == null){
     
        if(this.selectedItem?.DocOwner == "1"){
          var filtertedList: UserMaster[] = [];
          filtertedList = this.userMasterList?.filter(x=>x.department == 1);
          if(filtertedList?.length > 0){
            filtertedList.forEach(x=>{
              this.toMailId.push(x.emailID);
            })
          }
          var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
          approvalRejectionFormBody.CDRID_RefNo = this.refId;
          approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
          approvalRejectionFormBody.isApproved = 3;
          approvalRejectionFormBody.RejectedBy = 4;
          approvalRejectionFormBody.RejectReason = this.rejectionReason;
          approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
          this.SaveRejectRequest(approvalRejectionFormBody, this.selectedItem);
        }
        else if(this.selectedItem?.DocOwner == "2"){
          var filtertedList: UserMaster[] = [];
          filtertedList = this.userMasterList?.filter(x=>x.department == 2);
          if(filtertedList?.length > 0){
            filtertedList.forEach(x=>{
              this.toMailId.push(x.emailID);
            })
          }
          var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
          approvalRejectionFormBody.CDRID_RefNo = this.refId;
          approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
          approvalRejectionFormBody.isApproved = 3;
          approvalRejectionFormBody.RejectedBy = 12;
          approvalRejectionFormBody.RejectReason = this.rejectionReason;
          approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
          this.SaveRejectRequest(approvalRejectionFormBody, this.selectedItem);
        }
         else if(this.selectedItem?.DocOwner == "5"){
          var filtertedList: UserMaster[] = [];
          filtertedList = this.userMasterList?.filter(x=>x.department == 5);
          if(filtertedList?.length > 0){
            filtertedList.forEach(x=>{
              this.toMailId.push(x.emailID);
            })
          }
          var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
          approvalRejectionFormBody.CDRID_RefNo = this.refId;
          approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
          approvalRejectionFormBody.isApproved = 3;
          approvalRejectionFormBody.RejectedBy = 8;
          approvalRejectionFormBody.RejectReason = this.rejectionReason;
          approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
          this.SaveRejectRequest(approvalRejectionFormBody, this.selectedItem);
        }
        else if(this.selectedItem?.DocOwner == "4"){
          var filtertedList: UserMaster[] = [];
          filtertedList = this.userMasterList?.filter(x=>x.department == 4);
          if(filtertedList?.length > 0){
            filtertedList.forEach(x=>{
              this.toMailId.push(x.emailID);
            })
          }
         var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
         approvalRejectionFormBody.CDRID_RefNo = this.refId;
         approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
         approvalRejectionFormBody.isApproved = 3;
         approvalRejectionFormBody.RejectedBy = 14;
         approvalRejectionFormBody.RejectReason = this.rejectionReason;
         approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
         this.SaveRejectRequest(approvalRejectionFormBody, this.selectedItem);
       }
       else if(this.selectedItem?.DocOwner == "6"){
        var filtertedList: UserMaster[] = [];
        filtertedList = this.userMasterList?.filter(x=>x.department == 6);
        if(filtertedList?.length > 0){
          filtertedList.forEach(x=>{
            this.toMailId.push(x.emailID);
          })
        }
        var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
        approvalRejectionFormBody.CDRID_RefNo = this.refId;
        approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
        approvalRejectionFormBody.isApproved = 3;
        approvalRejectionFormBody.RejectedBy = 16;
        approvalRejectionFormBody.RejectReason = this.rejectionReason;
        approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
        this.SaveRejectRequest(approvalRejectionFormBody, this.selectedItem);
      }
    }
    else if(this.selectedItem?.Status == 1){
     
        if(this.selectedItem?.DocOwner == "1"){
          var filtertedList: UserMaster[] = [];
          filtertedList = this.userMasterList?.filter(x=>x.department == 1);
          if(filtertedList?.length > 0){
            filtertedList.forEach(x=>{
              this.toMailId.push(x.emailID);
            })
          }
          var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
          approvalRejectionFormBody.CDRID_RefNo = this.refId;
          approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
          approvalRejectionFormBody.isApproved = 3;
          approvalRejectionFormBody.RejectedBy = 6;
          approvalRejectionFormBody.RejectReason = this.rejectionReason;
         approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
          this.SaveRejectRequest(approvalRejectionFormBody, this.selectedItem);
        }
        else if(this.selectedItem?.DocOwner == "4"){
          var filtertedList: UserMaster[] = [];
          filtertedList = this.userMasterList?.filter(x=>x.department == 4);
          if(filtertedList?.length > 0){
            filtertedList.forEach(x=>{
              this.toMailId.push(x.emailID);
            })
          }
          var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
          approvalRejectionFormBody.CDRID_RefNo = this.refId;
          approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
          approvalRejectionFormBody.isApproved = 3;
          approvalRejectionFormBody.RejectedBy = 14;
          approvalRejectionFormBody.RejectReason = this.rejectionReason;
         approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
          this.SaveRejectRequest(approvalRejectionFormBody, this.selectedItem);
        }
         else if(this.selectedItem?.DocOwner == "5"){
          var filtertedList: UserMaster[] = [];
          filtertedList = this.userMasterList?.filter(x=>x.department == 5);
          if(filtertedList?.length > 0){
            filtertedList.forEach(x=>{
              this.toMailId.push(x.emailID);
            })
          }
          var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
          approvalRejectionFormBody.CDRID_RefNo = this.refId;
          approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
          approvalRejectionFormBody.isApproved = 3;
          approvalRejectionFormBody.RejectedBy = 10;
          approvalRejectionFormBody.RejectReason = this.rejectionReason;
          approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
          this.SaveRejectRequest(approvalRejectionFormBody, this.selectedItem);
        }
        else if(this.selectedItem?.DocOwner == "6"){
          var filtertedList: UserMaster[] = [];
          filtertedList = this.userMasterList?.filter(x=>x.department == 6);
          if(filtertedList?.length > 0){
            filtertedList.forEach(x=>{
              this.toMailId.push(x.emailID);
            })
          }
         var approvalRejectionFormBody: ApprovalRejectionFormBody = <ApprovalRejectionFormBody>{};
         approvalRejectionFormBody.CDRID_RefNo = this.refId;
         approvalRejectionFormBody.CDR_DocID = this.cdrDocId;
         approvalRejectionFormBody.isApproved = 3;
         approvalRejectionFormBody.RejectedBy = 2;
         approvalRejectionFormBody.RejectReason = this.rejectionReason;
         approvalRejectionFormBody.RejectRemark = this.rejectionRemark;
         this.SaveRejectRequest(approvalRejectionFormBody, this.selectedItem);
       }
    }
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


  viewRequest(refId: number){
    this.router.navigate(['/add-product',refId]);
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
  
  viewProjectNumber(i: number) {
    let strOut: string = '';
    this.productList = this.cdrRequestListResponse.filter(x => x.CDRID_RefNo == i)[0].ProductList;
    this.productList.forEach(x => {
      strOut += x.CDR_ProjectNumber + ' , ';
    })
    strOut = strOut.trim();
    strOut = strOut.substring(0, strOut.length - 1);
    return strOut;
  }

  viewCustomerName(i: number) {
    let strOut: string = '';
    this.productList = this.cdrRequestListResponse.filter(x => x.CDRID_RefNo == i)[0].ProductList;
    this.productList.forEach(x => {
      strOut += x.CDR_Customer + ' , ';
    })
    strOut = strOut.trim();
    strOut = strOut.substring(0, strOut.length - 1);
    return strOut;
  }

  viewLabelName(i: number) {
    let strOut: string = '';
    this.productList = this.cdrRequestListResponse.filter(x => x.CDRID_RefNo == i)[0].ProductList;
    this.productList.forEach(x => {
      strOut += x.CDR_LabelName + ' , ';
    })
    strOut = strOut.trim();
    strOut = strOut.substring(0, strOut.length - 1);
    return strOut;
  }

  viewPerfumerCode(i: number) {
    let strOut: string = '';
    this.productList = this.cdrRequestListResponse.filter(x => x.CDRID_RefNo == i)[0].ProductList;
    this.productList.forEach(x => {
      strOut += x.CDR_PerfumeCode + ' , ';
    })
    strOut = strOut.trim();
    strOut = strOut.substring(0, strOut.length - 1);
    return strOut;
  }

  viewCountryName(i: number) {
    let strOut: string[] = [];
    let countryName: string = '';
    this.productList = this.cdrRequestListResponse.filter(x => x.CDRID_RefNo == i)[0].ProductList;
    this.productList.forEach(x => {
      strOut.push(x.CDR_Country);
    })
    strOut.forEach(y => {
      countryName += this.countryList.find(x => x.value == y)?.text + ' , ';
    })
    countryName = countryName.trim();
    countryName = countryName.substring(0, countryName.length - 1);
    return countryName;
  }
}