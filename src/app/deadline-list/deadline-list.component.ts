import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DeadlineMaster, DeadlineMasterResponse, DocumentTypeMaster, DocumentTypeMasterResponse } from '../models/deadline-master';
import { SimpleResponse } from '../models/simple-response';
import { DeadlineMasterService } from '../services/deadline-master.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-deadline-list',
  templateUrl: './deadline-list.component.html',
  styleUrls: ['./deadline-list.component.css']
})
export class DeadlineListComponent implements OnInit {
  docTypeMasterList: DocumentTypeMaster[] = [];
  isShowSpinner: boolean = false;
  constructor(private router: Router,
    private _deadlineService:DeadlineMasterService,
    private utilityService: UtilityService,
    public activatedRoute: ActivatedRoute) {
  }
  
  ngOnInit(){
    this.getDocTypeMasterList();
  }

  getDocTypeMasterList() {
    this.isShowSpinner = true;
     this._deadlineService.getDocumentTypeMasterList()
      .then((result: DocumentTypeMasterResponse | void) => {
        if (result) {
          var response = UtilityService.clone(result);
          this.docTypeMasterList = response.documentTypeMasterList;
          this.isShowSpinner = false;
        }
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.isShowSpinner = false;
        this.utilityService.handleErrorResponse(err);
      });
  }

  editDocTypeDetails(Id: number){
    this.router.navigate(['/enter-deadline',Id]);

  }

  deleteUser(id: number){
    this._deadlineService.deleteDeadlineMasterId(id)
    .then((result: SimpleResponse | void) => {
      if (result) {
        if(result.msgFlag){
          var response = UtilityService.clone(result);
          Swal.fire({
            icon: 'success',
            title: 'Deadline',
            text: 'Deleted Successfully!',
            confirmButtonColor: '#6259ca'
          })
          this.getDocTypeMasterList();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Deadline',
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

  async confirmDelete(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-warning'
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons.fire(
    {
      showCloseButton: true,
      title: 'Deadline',
      text: 'Are you sure You want to delete this. ? ',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      reverseButtons: false
    }
    ).then((result) => {
      if (result.value) {
        this.deleteUser(id);
        return;
      }
    });
  }
}
