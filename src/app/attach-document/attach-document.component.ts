import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentRequestList, CDR_RequestListResponse, ApprovalRejectionFormBody, CommentBeforeCompletionFormBody, CDR_Products, dropdown } from '../models/add-product';
import { UserMaster } from '../models/user-master';
import { AddProductService } from '../services/add-product.service';
import { UtilityService } from '../services/utility.service';
import { SimpleResponse } from '../models/simple-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attach-document',
  templateUrl: './attach-document.component.html',
  styleUrls: ['./attach-document.component.css']
})
export class AttachDocumentComponent {
  countryList: dropdown[] = [];
  productList: CDR_Products[] = [];
  selectDocument: DocumentRequestList = <DocumentRequestList>{};
  documentRequestList: DocumentRequestList[] = [];
  cdrRequestListResponse: CDR_RequestListResponse[] = [];
  isShowSpinner: boolean = false;
  loggedInUser: UserMaster = <UserMaster>{};
  page: number = 1;
  commentBeforeComplete: string = "";
  constructor(private router: Router,
    private _addProdutService: AddProductService,
    private utilityService: UtilityService) {
  }
  
  ngOnInit(){
    this.setCountryData();
    this.loggedInUser = JSON.parse(localStorage?.getItem("loggedInUserData") ?? '{}');
    this.GetCdRequestList();
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
            this.documentRequestList = this.documentRequestList.filter(x=> x.AssignedToDeptt == this.loggedInUser?.department.toString() && x.Status == 1);
          
          this.isShowSpinner = false;
        }
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.isShowSpinner = false;
        this.utilityService.handleErrorResponse(err);
      });
  }


  viewRequest(refId: number){
    this.router.navigate(['/add-product',refId]);
  }

  submitRejectRequest(documentRequest: DocumentRequestList, value: string){
    if(value == "Approve"){
      localStorage.setItem('selectedDocToApprove', JSON.stringify(documentRequest));
      this.router.navigate(['/attached-document',documentRequest.CDRID_RefNo,documentRequest.CDR_DocID]);
    }
  }
  
  submitComment(documentRequest: DocumentRequestList){
this.selectDocument = documentRequest;
this.commentBeforeComplete = this.selectDocument?.CommentBeforeCompletion;
  }


  
 async SaveCommentBeforeCompletion(){
    
var obj: CommentBeforeCompletionFormBody = <CommentBeforeCompletionFormBody>{};
obj.CDRID_RefNo = this.selectDocument.CDRID_RefNo;
obj.CDR_DocID = this.selectDocument.CDR_DocID;
obj.CommentBy = Number(this.selectDocument.AssignedToDeptt);
obj.CommentBeforeCompletion = this.commentBeforeComplete;
   await this._addProdutService.submitCommentBeforeCompletion(obj)
   .then(async (result: SimpleResponse | void) => {
     if (result) {
       var response = UtilityService.clone(result);
       if(response?.msgFlag){
        Swal.fire({
          icon: 'success',
          title: 'CDR Form!',
          text: 'Comment Saved Successfully!',
          confirmButtonColor: '#6259ca'
        })
        window.location.reload();
     }
    }
   })
   .catch((err: HttpErrorResponse) => {
     console.log(err);
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
