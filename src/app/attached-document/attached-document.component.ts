import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CDR_RequestListResponse, DocumentRequestList } from '../models/add-product';
import { UserMaster } from '../models/user-master';
import { AddProductService } from '../services/add-product.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-attached-document',
  templateUrl: './attached-document.component.html',
  styleUrls: ['./attached-document.component.css']
})
export class AttachedDocumentComponent {
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
    this.loggedInUser = JSON.parse(localStorage?.getItem("loggedInUserData") ?? '{}');
    this.GetCdRequestList();
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
  
  submitComment(){

  }
}
