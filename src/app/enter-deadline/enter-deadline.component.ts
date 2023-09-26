import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DeadlineMaster, DeadlineMasterLoadResponse, DocumentTypeMaster, DocumentTypeMasterLoadResponse } from '../models/deadline-master';
import { SimpleResponse } from '../models/simple-response';
import { DeadlineMasterService } from '../services/deadline-master.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-enter-deadline',
  templateUrl: './enter-deadline.component.html',
  styleUrls: ['./enter-deadline.component.css']
})
export class EnterDeadlineComponent implements OnInit{
  deadlineForm!: FormGroup;
  docTypeMasterData: DocumentTypeMaster = <DocumentTypeMaster>{};
  deadlineId: number = 0;
  isViewMode: boolean = false;
  constructor(private router: Router,
    private _deadlineService:DeadlineMasterService,
    private utilityService: UtilityService,
    private formBuilder: FormBuilder, 
    public activatedRoute: ActivatedRoute) {
      this.activatedRoute.params.subscribe((param : Params) => {
        this.deadlineId = param['id'];
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  
  ngOnInit(){
    this.deadlineForm = this.prepareDeadlineForm();
    this.isViewMode = false;
    if(this.deadlineId > 0){
      this.isViewMode = true;
      this.loadDeadlineDataById(this.deadlineId);
    }
  }

  prepareDeadlineForm(){
    return this.deadlineForm = this.formBuilder.group({ 
      ID: [],
      documentType: ["",[Validators.required]],
      depptOwner: ["",[Validators.required]],
      assignToDeptt: ["",[Validators.required]],
      deadline: ["",[Validators.required]]
    });
  }

  copyDataValuesFromForm(){
    let deadlineObj: DocumentTypeMaster = <DocumentTypeMaster>{};
    deadlineObj.ID = this.deadlineId;
    deadlineObj.documentType = this.deadlineForm.get("documentType")?.value;
    deadlineObj.depptOwner = this.deadlineForm.get("depptOwner")?.value;
    deadlineObj.assignToDeptt = this.deadlineForm.get("assignToDeptt")?.value;
    deadlineObj.deadline = this.deadlineForm.get("deadline")?.value;
    this.docTypeMasterData = deadlineObj;
  }

  submitDeadlineForm(){
    if (this.deadlineForm.valid) {
      this.copyDataValuesFromForm();
      this.saveDeadlineDetails(this.docTypeMasterData);
    }
    else{
      this.deadlineForm.markAllAsTouched();
    }
  }

  async saveDeadlineDetails(data: DocumentTypeMaster) {
    await this._deadlineService.Update_InsertDocTypeMaster(data)
      .then(async (result: SimpleResponse | void) => {
        if (result) {
          if(result.msgFlag){
            this.deadlineForm.reset();
            Swal.fire({
                  icon: 'success',
                  title: 'Deadline Form!',
                  text: 'Saved Successfully!',
                  confirmButtonColor: '#6259ca'
                })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Deadline Form!',
              text: result.message,
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

  async loadDeadlineDataById(ID: number) {
    await this._deadlineService.LoadDocTypeMasterDetails(ID)
      .then(async (result: DocumentTypeMasterLoadResponse | void) => {
        if (result) {
          var response = UtilityService.clone(result);
          this.docTypeMasterData = response.documentTypeMasterDetails;
          this.deadlineForm.patchValue(this.docTypeMasterData);
        }
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.utilityService.handleErrorResponse(err);
      });
  }

}
