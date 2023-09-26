import { Component, Input, OnInit } from '@angular/core';
import { UserMaster } from 'src/app/models/user-master';
import { UserMasterService } from 'src/app/services/user-master.service';

@Component({
  selector: 'app-cpis-header',
  templateUrl: './cpis-header.component.html',
  styleUrls: ['./cpis-header.component.css']
})
export class CpisHeaderComponent implements OnInit{
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