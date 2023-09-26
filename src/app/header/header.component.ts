import { Component, Input, OnInit } from '@angular/core';
import { UserMaster } from '../models/user-master';
import { UserMasterService } from '../services/user-master.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
@Input() userData: UserMaster = <UserMaster>{};
constructor(
  private _userService:UserMasterService) {
}
ngOnInit(){
}
logout(){
  localStorage.removeItem("loggedInUserData");
  this._userService.isShowMenu.next(<UserMaster>{});
}
}
