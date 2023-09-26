import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserMaster } from './models/user-master';
import { UserMasterService } from './services/user-master.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'takaSago';
  isShowLogin: boolean = false;
  userData!: UserMaster;
  
  constructor(private _userService:UserMasterService,
    public activatedRoute: ActivatedRoute) {
      this.userData = <UserMaster>{};
      this._userService.isShowMenu.subscribe(value=> {
       if(value?.userID > 0)
        this.userData  = value;
        else{
          this.userData = JSON.parse(localStorage?.getItem("loggedInUserData") ?? '{}');
        }
        if(this.userData && this.userData?.userID == undefined)
        this.isShowLogin = true;
        else{
          this.isShowLogin = false;
        }
       });
      
  }
  ngOnInit(){
   
}
}
