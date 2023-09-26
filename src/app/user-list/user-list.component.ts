import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SimpleResponse } from '../models/simple-response';
import { UserMaster, UserMasterResponse } from '../models/user-master';
import { UserMasterService } from '../services/user-master.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @Input() loggedInUser: UserMaster = <UserMaster>{};
  userMasterList: UserMaster[] = [];
  constructor(private router: Router,
    private _userService:UserMasterService,
    private utilityService: UtilityService,
    public activatedRoute: ActivatedRoute) {
  }
  
  ngOnInit(){
    this.loggedInUser = JSON.parse(localStorage?.getItem("loggedInUserData") ?? '{}');
    this.getUserMasterList();
  }

 getUserMasterList() {
     this._userService.getUserList()
      .then((result: UserMasterResponse | void) => {
        if (result) {
          var response = UtilityService.clone(result);
          if(this.loggedInUser.department != 3){
            console.log("not admin");
            this.userMasterList = response.userList?.filter(x=>x.userID == this.loggedInUser.userID);
          }
          else
          this.userMasterList = response.userList;
        }
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.utilityService.handleErrorResponse(err);
      });
  }

  editUserDetails(userId: number){
    this.router.navigate(['/create-user',userId]);

  }

  deleteUser(userId: number){
    this._userService.deleteUseryId(userId)
    .then((result: SimpleResponse | void) => {
      if (result) {
        if(result.msgFlag){
          var response = UtilityService.clone(result);
          Swal.fire({
            icon: 'success',
            title: 'User',
            text: 'Deleted Successfully!',
            confirmButtonColor: '#6259ca'
          })
          this.getUserMasterList();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'User',
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

  async confirmDelete(userId: number) {
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
      title: 'User',
      text: 'Are you sure You want to delete this User ? ',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      reverseButtons: false
    }
    ).then((result) => {
      if (result.value) {
        this.deleteUser(userId);
        return;
      }
    });
  }
}
