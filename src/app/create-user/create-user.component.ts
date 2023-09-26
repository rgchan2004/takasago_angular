import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SimpleResponse } from '../models/simple-response';
import { UserMaster, UserMasterLoadResponse } from '../models/user-master';
import { UserMasterService } from '../services/user-master.service';
import { UtilityService } from '../services/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  userMasterData: UserMaster = <UserMaster>{};
  userId: number = 0;
  loggedInUser: UserMaster = <UserMaster>{};
  constructor(private router: Router,
    private _userService:UserMasterService,
    private utilityService: UtilityService,
    private formBuilder: FormBuilder, 
    public activatedRoute: ActivatedRoute) {
      this.activatedRoute.params.subscribe((param : Params) => {
        this.userId = param['id'];
    });
    
  }
  
  ngOnInit(){
    this.loggedInUser = JSON.parse(localStorage?.getItem("loggedInUserData") ?? '{}');
    this.userForm = this.prepareUserForm();
    this.formControlValueChanged();
    if(this.userId > 0){
      this.loadUserDataById(this.userId);
    }
  }

  prepareUserForm(){
    return this.userForm = this.formBuilder.group({ 
      userID: [],
      fullName: ["",[Validators.required]],
      emailID: ["",[Validators.required]],
      password: ["",[Validators.required]],
      documentType: ["1"],
      department: ["3"],
      txtOtherDeptt: [""],
      projectNumber: [""],
      approvalFor: [""]
    });
  }

  formControlValueChanged() {
    
    const phoneControl = this.userForm.get('txtOtherDeptt');
    this.userForm.get('department')?.valueChanges.subscribe(
        (mode: string) => {
            if (mode === '7') {
                phoneControl?.setValidators([Validators.required]);
            }
            phoneControl?.updateValueAndValidity();
        });

}

  copyDataValuesFromForm(){
    let userObj: UserMaster = <UserMaster>{};
    userObj.userID = this.userId;
    userObj.fullName = this.userForm.get("fullName")?.value;
    userObj.emailID = this.userForm.get("emailID")?.value;
    userObj.password = this.userForm.get("password")?.value;
    userObj.documentType = this.userForm.get("documentType")?.value ?? 0;

    if(this.userForm.get("documentType")?.value == 1 || this.userForm.get("documentType")?.value == 2){
      userObj.department = this.userForm.get("department")?.value ?? 0;
      if(this.userForm.get("department")?.value == 7){
        userObj.txtOtherDeptt = this.userForm.get("txtOtherDeptt")?.value ?? "";
      }
    }
   if(this.userForm.get("documentType")?.value == 2){
      userObj.projectNumber = this.userForm.get("projectNumber")?.value ?? 0;
      userObj.approvalFor = this.userForm.get("approvalFor")?.value ?? "";
    }
   
    this.userMasterData = userObj;
  }

  submitUserForm(){
    if (this.userForm.valid) {
      this.copyDataValuesFromForm();
      this.saveUserDetails(this.userMasterData);
    }
    else{
      this.userForm.markAllAsTouched();
    }
  }

  async saveUserDetails(data: UserMaster) {
    await this._userService.updateUserDetails(data)
      .then(async (result: SimpleResponse | void) => {
        if (result) {
          if(result.msgFlag){
            this.userForm.reset();
            this.prepareUserForm();
            Swal.fire({
                  icon: 'success',
                  title: 'User Form!',
                  text: 'Saved Successfully!',
                  confirmButtonColor: '#6259ca'
                })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'User Form!',
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

  async loadUserDataById(userId: number) {
    await this._userService.getUserDataById(userId)
      .then(async (result: UserMasterLoadResponse | void) => {
        if (result) {
          var response = UtilityService.clone(result);
          this.userMasterData = response.userDetails;
          this.userForm.patchValue(this.userMasterData);
          this.userForm.get("fullName")?.setValue(this.userMasterData.fullName);
          this.userForm.get("userID")?.setValue(this.userMasterData.userID);
          this.userForm.get("emailID")?.setValue(this.userMasterData.emailID);
          this.userForm.get("password")?.setValue(this.userMasterData.password);
          this.userForm.get("documentType")?.setValue(this.userMasterData.documentType.toString());
          this.userForm.get("department")?.setValue(this.userMasterData.department.toString());
          this.userForm.get("txtOtherDeptt")?.setValue(this.userMasterData.txtOtherDeptt.toString());
          this.userForm.get("projectNumber")?.setValue(this.userMasterData.projectNumber);
          this.userForm.get("approvalFor")?.setValue(this.userMasterData.approvalFor.toString());
        }
      })
      .catch((err: HttpErrorResponse) => {
        console.log(err);
        this.utilityService.handleErrorResponse(err);
      });
  }

  

}

