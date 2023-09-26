import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeadlineMaster, DeadlineMasterResponse, DocumentTypeMaster, DocumentTypeMasterResponse } from '../models/deadline-master';
import { DeadlineMasterService } from '../services/deadline-master.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-create-document-request',
  templateUrl: './create-document-request.component.html',
  styleUrls: ['./create-document-request.component.css']
})
export class CreateDocumentRequestComponent implements OnInit {
  deadlineMasterList: DocumentTypeMaster[] = [];
  deadlineMasterList_: DocumentTypeMaster[] = [];
  date!: Date;
  date_: Date = new Date();
  constructor(private router: Router,
    private _deadlineService:DeadlineMasterService,
    private utilityService: UtilityService,
    public activatedRoute: ActivatedRoute) {
  }
  
  ngOnInit(){
    this.date = new Date();
    this.getDeadlineMasterList();
  }

  getDeadlineMasterList() {
     this._deadlineService.getDocumentTypeMasterList()
      .then((result: DocumentTypeMasterResponse | void) => {
        if (result) {
          var response = UtilityService.clone(result);
          this.deadlineMasterList = response.documentTypeMasterList;
        }
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.utilityService.handleErrorResponse(err);
      });
  }

  onDeadlineChange(value: DocumentTypeMaster){
    if(value.checked == true && this.deadlineMasterList_.filter(x=>x.ID == value.ID)[0] == null){
      this.deadlineMasterList_.push(value);
    }else if(value.checked == false && this.deadlineMasterList_.filter(x=>x.ID == value.ID)[0] != null){
     this.deadlineMasterList_.filter(x=>x.ID == value.ID)[0].checked = value.checked;
    }else{
      return;
    }
  }

  getDeadlineDate(value: any){
     var startDate = new Date();
     var endDate: Date, noOfDaysToAdd = value, count = 0;
     while(count < noOfDaysToAdd){
          endDate = new Date(startDate.setDate(startDate.getDate() + 1));
              if(endDate.getDay() != 0 && endDate.getDay() != 6){
                       count++;
                          }
                        }
                        return (endDate)
}

  countinueToCreateRequest(){
    this.deadlineMasterList_ = this.deadlineMasterList_.filter(x=>x.checked == true);
      localStorage.setItem('selectedDocumentTypes', JSON.stringify(this.deadlineMasterList_));
      this.router.navigate(['/add-product',0]);
  }
}
