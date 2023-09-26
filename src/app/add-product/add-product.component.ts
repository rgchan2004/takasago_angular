import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddProduct, CDR_Products, CDR_RefDocuments, CDR_RequestListResponse, CDR_SelectedDocumentType, CreateDocumentRequest, MailSendObj, ProductDetails } from '../models/add-product';
import { DeadlineMaster, DocumentTypeMaster } from '../models/deadline-master';
import { SimpleResponse } from '../models/simple-response';
import { UserMaster, UserMasterLoadResponse, UserMasterResponse } from '../models/user-master';
import { AddProductService } from '../services/add-product.service';
import { UserMasterService } from '../services/user-master.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  selectedDocumentList: DocumentTypeMaster[] = [];
  isShowSpinner: boolean = false;
  isViewMode: boolean = false;
  addProductObj: AddProduct = <AddProduct>{};
  cdrRequestResponse: CDR_RequestListResponse = <CDR_RequestListResponse>{};
  CDR_RefDocuments: string = "";
  date: Date = new Date();
  myFiles:string [] = [];
  userMasterList: UserMaster[] = [];
  sMsg:string = '';
  loggedInUser: UserMaster = <UserMaster>{};
  refId: number = 0;
  originatorName : string = "";
  constructor(private _userService:UserMasterService, private router: Router,private datePipe: DatePipe,private _addProdutService: AddProductService,
    private utilityService: UtilityService,
    public activatedRoute: ActivatedRoute) {
      this.activatedRoute.params.subscribe((param : Params) => {
        this.refId = param['id'];
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  
  ngOnInit(){
    this.loggedInUser = JSON.parse(localStorage?.getItem("loggedInUserData") ?? '{}');
    this.getUserMasterList();
    if(+this.refId <= 0){
      this.selectedDocumentList = JSON.parse(localStorage.getItem("selectedDocumentTypes") ?? '') as DocumentTypeMaster[];
      this.selectedDocumentList.forEach(x=>{
        x.deadlineDate = new Date();
        var endDate: Date, count = 0;
        while(count < x.deadline){
             endDate = new Date(x.deadlineDate.setDate(x.deadlineDate.getDate() + 1));
                 if(endDate.getDay() != 0 && endDate.getDay() != 6){
                          count++;
                             }
                           }
                           x.deadlineDate = this.datePipe.transform(endDate, 'yyyy-MM-dd') ?? '';
      })
    }
    this.addProductObj.documentAttached = [];
    this.addProductObj.documentAttached = this.selectedDocumentList;
    this.addProductObj.productDetails = [];
    this.addProductObj.purpose = "-1";
    this.addProductObj.productDetails.push({
      id: Date.now(),
      perfumeCode: '',
      corporateCode: '',
      sixACode: '',
      projectNo: '',
      labelName: '',
      countryName: '-1',
      customerName: '',
      endApplication: '',
      dosage: '',
      lotNumber: ''
      });

    if(this.refId > 0){
      this.isViewMode = true;
      this.GetCdRequestList();
    }
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
   this._addProdutService.GetSelectedCdRequestList(this.refId)
    .then((result: CDR_RequestListResponse[] | void) => {
      if (result) {
        var response = UtilityService.clone(result);
        this.cdrRequestResponse = response.filter(x=>x.CDRID_RefNo == this.refId)[0];
        this.addProductObj.documentRefNo = this.cdrRequestResponse.CDRID_RefNo;
        this.addProductObj.salesPerson = this.cdrRequestResponse.SalesPerson;
        this.addProductObj.purpose = this.cdrRequestResponse.Purpose;
        this.addProductObj.remarks = this.cdrRequestResponse.Remarks;
        this.addProductObj.referenceDRNo = this.cdrRequestResponse.ReferenceDRNumber;
        this.loadUserDataById(parseInt(this.addProductObj.referenceDRNo))
        this.addProductObj.originalDRNo = this.cdrRequestResponse.OriginalDRNumber;
        this.addProductObj.referenceDocument = this.cdrRequestResponse.ReferenceDocList;
        this.addProductObj.productDetails = [];
        for (let item of this.cdrRequestResponse.ProductList) {
          var ProductDetailsObj: ProductDetails = <ProductDetails>{};
          ProductDetailsObj.id = item.CDR_ProductID,
          ProductDetailsObj.perfumeCode = item.CDR_PerfumeCode,
          ProductDetailsObj.corporateCode = item.CDR_CorporateCode,
          ProductDetailsObj.sixACode = item.CDR_SixACode,
          ProductDetailsObj.projectNo = item.CDR_ProjectNumber,
          ProductDetailsObj.labelName = item.CDR_LabelName,
          ProductDetailsObj.countryName = item.CDR_Country,
          ProductDetailsObj.customerName = item.CDR_Customer,
          ProductDetailsObj.endApplication = item.CDR_EndApplication,
          ProductDetailsObj.dosage = item.CDR_Dosage,
          ProductDetailsObj.lotNumber = item.CDR_LotNumber,
          this.addProductObj.productDetails.push(ProductDetailsObj)
        }   
        this.addProductObj.documentAttached = [];
        for (let item of this.cdrRequestResponse.SelDocTypeList) {
          var DocumentTypeMasterObj: DocumentTypeMaster = <DocumentTypeMaster>{};
          DocumentTypeMasterObj.ID = item.CDR_DocTypeID,
          DocumentTypeMasterObj.documentType = item.CDR_DocumentType,
          DocumentTypeMasterObj.deadlineDate = item.CDR_Deadline,
          DocumentTypeMasterObj.assignToDeptt = item.CDR_AssignToDeptt,
          DocumentTypeMasterObj.documentName = item.CDR_DocumentName,
          DocumentTypeMasterObj.remarks = item.CDR_Remarks ?? "",
          DocumentTypeMasterObj.depptOwner = item.DocTypeOwner,
          DocumentTypeMasterObj.checked = true;
          this.addProductObj.documentAttached.push(DocumentTypeMasterObj)
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

  addProductDetails(){
    this.addProductObj.productDetails.push({
      id: Date.now(),
      perfumeCode: '',
      corporateCode: '',
      sixACode: '',
      projectNo: '',
      labelName: '',
      countryName: '-1',
      customerName: '',
      endApplication: '',
      dosage: '',
      lotNumber: ''
      })
  }

  delete(i: any){
    this.addProductObj.productDetails.splice(i,1);
  }

  track(item:any,index:number){
    return index;
    }
  
   async saveRequest(){
      await this.uploadFiles();
      this.copyFormDataToModel();
    }
      
    copyFormDataToModel(){
      var CreateDocumentRequestObj: CreateDocumentRequest = <CreateDocumentRequest>{};
      CreateDocumentRequestObj.CDRID_RefNo = 0;
      CreateDocumentRequestObj.SalesPerson = this.loggedInUser.fullName ?? "";
      CreateDocumentRequestObj.Purpose = "";
      CreateDocumentRequestObj.Remarks = this.addProductObj.remarks ?? "";
      CreateDocumentRequestObj.ReferenceDRNumber = this.loggedInUser.userID.toString(); 
      CreateDocumentRequestObj.OriginalDRNumber = '';

      CreateDocumentRequestObj.CDR_SelectedDocumentTypes = '';
      CreateDocumentRequestObj.CDR_SelectedDocumentTypeList = [];
      for (let item of this.addProductObj.documentAttached) {
        var CDR_SelectedDocumentTypeObj: CDR_SelectedDocumentType = <CDR_SelectedDocumentType>{};
        CDR_SelectedDocumentTypeObj.CDRID_RefNo = 0,
        CDR_SelectedDocumentTypeObj.CDR_DocTypeID = item.ID;
        CDR_SelectedDocumentTypeObj.CDR_Deadline = item.deadlineDate.toString(),
        CDR_SelectedDocumentTypeObj.CDR_DocumentType = item.documentType,
        CDR_SelectedDocumentTypeObj.CDR_Remarks = item.remarks ?? "",
        CDR_SelectedDocumentTypeObj.CDR_AssignToDeptt = item.assignToDeptt ?? "",
        CDR_SelectedDocumentTypeObj.CDR_DocumentName = item.documentName ?? "",
        CDR_SelectedDocumentTypeObj.DocTypeOwner = item.depptOwner,
        CreateDocumentRequestObj.CDR_SelectedDocumentTypeList.push(CDR_SelectedDocumentTypeObj)
      }   

      CreateDocumentRequestObj.CDR_RefDocuments = this.CDR_RefDocuments;
      CreateDocumentRequestObj.CDR_RefDocumentsList = [];

      CreateDocumentRequestObj.CDR_ProductDetails = "";
      CreateDocumentRequestObj.CDR_ProductDetailsList = [];
      for (let item of this.addProductObj.productDetails) {
        var CDR_ProductsObj: CDR_Products = <CDR_Products>{};
        CDR_ProductsObj.CDR_ProductID = 0,
        CDR_ProductsObj.CDRID_RefNo = 0,
        CDR_ProductsObj.CDR_PerfumeCode = item.perfumeCode.toString() ?? "",
        CDR_ProductsObj.CDR_CorporateCode = item.corporateCode.toString() ?? "",
        CDR_ProductsObj.CDR_SixACode = item.sixACode.toString() ?? "",
        CDR_ProductsObj.CDR_ProjectNumber = item.projectNo.toString() ?? "",
        CDR_ProductsObj.CDR_LabelName = item.labelName ?? "",
        CDR_ProductsObj.CDR_Country = item.countryName ?? "",
        CDR_ProductsObj.CDR_Customer = item.customerName ?? "",
        CDR_ProductsObj.CDR_EndApplication = item.endApplication ?? "",
        CDR_ProductsObj.CDR_Dosage = item.dosage ?? "",
        CDR_ProductsObj.CDR_LotNumber = item.lotNumber.toString() ?? "",
        CreateDocumentRequestObj.CDR_ProductDetailsList.push(CDR_ProductsObj)
      }   
      this.submitRequest(CreateDocumentRequestObj);
    }

    getFileDetails (e: any) {
      for (var i = 0; i < e.target.files.length; i++) { 
        this.myFiles.push(e.target.files[i]);
      }
    }
  
   async uploadFiles () {
      const frmData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) { 
        frmData.append("fileUpload"+i, this.myFiles[i]);
      }
       await this._addProdutService.uploadRefDocuments(frmData)
         .then((result: SimpleResponse | void) => {
           if (result) {
             var response = UtilityService.clone(result);
             if(response?.msgFlag){
              this.CDR_RefDocuments = response.message;
             } 
           }
         })
         .catch((err: HttpErrorResponse) => {
           console.log(err);
           this.utilityService.handleErrorResponse(err);
         });
    }

    submitRequest (cdrObject: CreateDocumentRequest) {
        this._addProdutService.CDRMaster_UpdateInsert(cdrObject)
         .then((result: SimpleResponse | void) => {
           if (result) {
            if(result.msgFlag){
              var response = UtilityService.clone(result);
              Swal.fire({
                    icon: 'success',
                    title: 'CDR Form!',
                    text: 'Submitted Successfully! and Your Request Number is - ' + response.id,
                    confirmButtonColor: '#6259ca'
                  })
                  
                  var mailObj: MailSendObj = <MailSendObj>{};
                  mailObj.sendMailTo = [];
                  mailObj.sendMailTo.push(this.loggedInUser?.emailID);
                  mailObj.isCustom = true;
                  mailObj.message = "Document Request Raised Successfully." +  "and Your Request Number is - " + response.id;
                  mailObj.subject = "Document Request";
                  this.mailSentMethod(mailObj);
                    
                  var mailObjList: MailSendObj[] = [];
                    response.mailSendEmailIdList.forEach(x=>{
                      var mailObj_: MailSendObj = <MailSendObj>{};
                      mailObj_.sendMailTo = [];
                      mailObj_.sendMailTo.push(x.emailId);
                      mailObj_.isCustom = false;
                      mailObj_.message = "Pending";
                      mailObj_.subject = "";
                      mailObj_.documentRequestNo = response.id;
                      mailObj_.documentRequestType = x.docType;
                      mailObj_.originator = this.loggedInUser?.fullName;
                      mailObj_.statusDate = this.datePipe.transform(new Date(), 'MMM d, y');
                      mailObjList.push(mailObj_);
                    })
                    this.mailSentMethodBulk(mailObjList);

                  this.addProductObj = <AddProduct>{};
                  this.router.navigate(['/qa-document-list']);
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'CDR Form!',
                text: result?.message,
                confirmButtonColor: '#6259ca'
              })
            }

           }
         })
         .catch((err: HttpErrorResponse) => {
           console.log(err);
           this.utilityService.handleErrorResponse(err);
         });
    }

    downloadFile(data: CDR_RefDocuments){
      let byteChar = atob(data.CDR_AttachedDocumentBase64);
      let byteArray = new Array(byteChar.length);
      for(let i = 0; i < byteChar.length; i++){
        byteArray[i] = byteChar.charCodeAt(i);
      }
      let uIntArray = new Uint8Array(byteArray);
      let blob = new Blob([uIntArray], {type : data?.CDR_DocType});
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
        link.download = `${data.CDR_AttachedDocumentName}`;
        link.click();
    }

    
  mailSentMethod(mailBody: MailSendObj){
    this._addProdutService.sendMail(mailBody)
      .then((result: SimpleResponse | void) => {
        if (result) {
          var response = UtilityService.clone(result);
       }
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.utilityService.handleErrorResponse(err);
      });
  }
  
  mailSentMethodBulk(mailBody: MailSendObj[]){
    this._addProdutService.sendMailBulk(mailBody)
      .then((result: SimpleResponse | void) => {
        if (result) {
          var response = UtilityService.clone(result);
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
          this.originatorName = response.userDetails?.fullName;
        }
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.utilityService.handleErrorResponse(err);
      });
  }
  }
