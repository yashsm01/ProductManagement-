import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss']
})
export class MasterListComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  LOGOUT(){
    sessionStorage.clear();
    this.router.navigate(["/"]);
  }

}
