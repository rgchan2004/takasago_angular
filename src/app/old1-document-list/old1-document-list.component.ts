import { HttpErrorResponse } from '@angular/common/http';
import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { CDRDocRequest, CDR_Products, CDR_RefDocuments, CDR_RequestListResponse, CDR_SelectedDocumentType, DocumentRequestList, Documents, dropdown } from '../models/add-product';
import { DeadlineMasterResponse, DocumentTypeMaster, DocumentTypeMasterLoadResponse, DocumentTypeMasterResponse } from '../models/deadline-master';
import { UserMaster } from '../models/user-master';
import { AddProductService } from '../services/add-product.service';
import { DeadlineMasterService } from '../services/deadline-master.service';
import { UtilityService } from '../services/utility.service';


@Component({
  selector: 'app-old1-document-list',
  templateUrl: './old1-document-list.component.html',
  styleUrls: ['./old1-document-list.component.css']
})
export class Old1DocumentListComponent {
    countryList: dropdown[] = [];
    isShowPiechart: boolean = false;
    loggedInUser: UserMaster = <UserMaster>{};
    docTypeMasterList: DocumentTypeMaster[] = [];
    cdrDocRequest: CDRDocRequest = <CDRDocRequest>{};
    documentRequestList: DocumentRequestList[] = [];
    isShowSpinner: boolean = false;
    fileUrl: any;
    page: number = 1;
    cdrRequestListResponse: CDR_RequestListResponse[] = [];
    referenceDocList: CDR_RefDocuments[] = [];
    productList: CDR_Products[] = [];
    public pieChartOptions: ChartOptions<'pie'> = {
      responsive: false,
    };
    public chartColors: any[] = [
      {
        backgroundColor: ["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"]
      }];
    public pieChartLabels = ['Total Request', 'In-Process', 'Rejected', 'Approved', 'Not Atteded'];
    public pieChartDatasets: ChartData<'pie'> = {
      datasets: [
        {
          data: Array<any>(),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)'
          ],
          borderWidth: 1
        }
      ],
  
      labels: this.pieChartLabels
    };
    public pieChartLegend = true;
    public pieChartPlugins: any = [];
    constructor(private router: Router, private sanitizer: DomSanitizer, private _deadlineService: DeadlineMasterService,
      private _addProdutService: AddProductService,
      private utilityService: UtilityService,
      public activatedRoute: ActivatedRoute) {
    }
  
    ngOnInit() {
      this.setCountryData();
      this.loggedInUser = JSON.parse(localStorage?.getItem("loggedInUserData") ?? '{}');
      this.GetCdRequestList();
  
  
    }
  
    getDocTypeMasterList() {
      this._deadlineService.getDocumentTypeMasterList()
        .then((result: DocumentTypeMasterResponse | void) => {
          if (result) {
            var response = UtilityService.clone(result);
            this.docTypeMasterList = response.documentTypeMasterList;
          }
        })
        .catch((err: HttpErrorResponse) => {
          console.log(err);
          this.utilityService.handleErrorResponse(err);
        });
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
      this._addProdutService.GetOld1CdRequestList()
        .then((result: CDR_RequestListResponse[] | void) => {
          if (result) {
            var response = UtilityService.clone(result);
            console.log("response:",response);
            this.cdrRequestListResponse = response;
            this.cdrRequestListResponse.forEach(i => i.SelDocTypeList.forEach(j => {
              this.documentRequestList.push({
                CDRID_RefNo: i.CDRID_RefNo,
                SalesPerson: i.SalesPerson,
                ReferenceDrNumber: parseInt(i.ReferenceDRNumber),
                TypeOfDocument: j.CDR_DocumentType,
                dtModified: j.dtModified != "0001-01-01T00:00:00" ? new Date(j.dtModified) : "",
                AssignedToDeptt: j.CDR_AssignToDeptt,
                ProjectNumber: i.ProductList[0].CDR_ProjectNumber,
                CustomerName: i.ProductList[0].CDR_Customer,
                country: i.ProductList[0].CDR_Country,
                labelName: i.ProductList[0].CDR_LabelName,
                perfumerCode: i.ProductList[0].CDR_PerfumeCode,
                Status: j.isApproved,
                DocOwner: j.DocTypeOwner,
                isShowLink: (i.ReferenceDRNumber == this.loggedInUser.userID.toString()) ? false : true,
                deadlineDays: j.CDR_Deadline,
                CDR_DocID: j.CDR_DocID,
                createdDate: new Date(j.dtCreated),
                targetDate: j.CDR_Deadline,
                CommentBy: j.CommentBy,
                CommentBeforeCompletion: j.CommentBeforeCompletion
              })
            }))
            if (this.loggedInUser?.department == 1 || this.loggedInUser?.department == 2 || this.loggedInUser?.department == 4 || this.loggedInUser?.department == 5 || this.loggedInUser?.department == 6) {
              this.documentRequestList = this.documentRequestList.filter(x => (x.ReferenceDrNumber == this.loggedInUser.userID || x.AssignedToDeptt == this.loggedInUser?.department.toString() || x.DocOwner == this.loggedInUser?.department.toString()) && (x.Status == 0 || x.Status == 1 || x.Status == 2 || x.Status == 3));
  
            } else if (this.loggedInUser?.department == 3) {
              this.documentRequestList = this.documentRequestList;
            }
            else {
              this.documentRequestList = this.documentRequestList.filter(x => x.ReferenceDrNumber == this.loggedInUser.userID);
            }
            this.isShowSpinner = false;
            let arr: any[];
            arr = [];
            arr.push(this.documentRequestList.length);
            arr.push(this.documentRequestList.filter(x => x.Status == 1)?.length);
            arr.push(this.documentRequestList.filter(x => x.Status == 3)?.length);
            arr.push(this.documentRequestList.filter(x => x.Status == 2)?.length);
            arr.push(this.documentRequestList.filter(x => x.Status == 0)?.length);
            this.pieChartDatasets.datasets.push({
              data: arr
            });
            var isShow = true;
            this.pieChartDatasets.datasets[1].data.forEach(x => {
              if (x == 0)
                isShow = false;
            })
            this.isShowPiechart = isShow;
          }
        })
        .catch((err: HttpErrorResponse) => {
          this.isShowSpinner = false;
          console.log(err);
          this.utilityService.handleErrorResponse(err);
        });
    }
  
    downloadFile(data: Documents) {
      let byteChar = atob(data.Document);
      let byteArray = new Array(byteChar.length);
      for (let i = 0; i < byteChar.length; i++) {
        byteArray[i] = byteChar.charCodeAt(i);
      }
      let uIntArray = new Uint8Array(byteArray);
      let blob = new Blob([uIntArray], { type: data?.Doc_Type });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${data.Doc_Name}`;
      link.click();
    }
  
    viewUpload(i: number, cdrDocId: number) {
      this.getDocumentRequestData(i, cdrDocId);
      this.referenceDocList = this.cdrRequestListResponse.filter(x => x.CDRID_RefNo == i)[0].ReferenceDocList ?? [];
    }
  
    viewProductDetails(i: number) {
      this.productList = this.cdrRequestListResponse.filter(x => x.CDRID_RefNo == i)[0].ProductList;
    }
  
    viewRequest(refId: number) {
      this.router.navigate(['/add-product', refId]);
    }
  
    getDocumentRequestData(refId: number, cdrDocId: number) {
      this._addProdutService.LoadCdRequestDetail(refId, cdrDocId)
        .then((result: CDRDocRequest | void) => {
          if (result) {
            var response = UtilityService.clone(result);
            this.cdrDocRequest = response;
          }
        })
        .catch((err: HttpErrorResponse) => {
          console.log(err);
          this.utilityService.handleErrorResponse(err);
        });
    }
  
    public chartClicked(e: any): void {
      console.log(e);
    }
  
    public chartHovered(e: any): void {
      console.log(e);
    }
  
    getCountryValue(value: string) {
      return this.countryList.find(x => x.value == value)?.text;
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
  