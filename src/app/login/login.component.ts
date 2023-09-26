import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserMaster, UserMasterLoadResponse } from '../models/user-master';
import { UserMasterService } from '../services/user-master.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  emailId: string = "";
  password: string = "";

  userData: UserMaster = <UserMaster>{};
  
  constructor(private router: Router, private _userService:UserMasterService,
    private utilityService: UtilityService,
    public activatedRoute: ActivatedRoute) {
  }
  
  ngOnInit(){
  }

  loginin(){
    if(this.emailId != "" && this.password != ""){
      this.authenticateUser(this.emailId, this.password);
    }
  }

  authenticateUser(emailId: string = "", password: string = ""){
    this._userService.authenticateUser(emailId,password)
    .then((result: UserMasterLoadResponse | void) => {
      if (result) {
        var response = UtilityService.clone(result);
        if(response.msgFlag){
          Swal.fire({
            icon: 'success',
            title: 'User',
            text: 'Logged In Successfully!',
            confirmButtonColor: '#6259ca'
          })
          localStorage.removeItem("loggedInUserData")
          localStorage.setItem("loggedInUserData",JSON.stringify(response.userDetails))
          this.userData = response.userDetails;
          this._userService.isShowMenu.next(response.userDetails);
          if(this.userData.documentType == 2)
          this.router.navigate(['/pricing-list']);
          else
          this.router.navigate(['/qa-document-list']);

        }else{
          Swal.fire({
            icon: 'error',
            title: 'User',
            text: 'Login failed!',
            confirmButtonColor: '#6259ca'
          })
          this.emailId = "";
          this.password = "";
        }
       
      }
    })
    .catch((err: HttpErrorResponse) => {
      console.log(err);
      this.utilityService.handleErrorResponse(err);
    });

  }
}
