import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(private router:Router) { 
    if(sessionStorage.getItem("userType")){
      if(sessionStorage.getItem("userType") == "Admin"){
        this.router.navigate(["master"]);
      }
      else{
        this.router.navigate(["customer"]);
      }
    }
  }

  ngOnInit(): void {
  }
  LOGOUT(){
    sessionStorage.clear();
    this.router.navigate(["/"]);
  }
}
