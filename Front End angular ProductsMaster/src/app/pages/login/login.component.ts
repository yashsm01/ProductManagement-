import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServicesService } from 'src/app/services/login/login-services.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  checked1 = true;
  checked2 = false;
  userType = "Admin";
  message = "";
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router: Router) { 
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
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  this.message = "";
  }

  get f() { return this.loginForm.controls; }


  onSubmit(){
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
    this.http.post<{message:string,user:any,userType:any,id:any,token:any}>(environment.url+"/api/login",{Username:this.loginForm.controls['username'].value,Password:this.loginForm.controls['password'].value}).subscribe(res => {
      console.log(res);
      if(res.user) {
        
        sessionStorage.setItem('token',res.token);
        if(res.userType == "Admin"){
          sessionStorage.setItem('userType',res.userType);
          this.router.navigate(["master"]);
        }else{
          sessionStorage.setItem('userType',res.userType);
          this.router.navigate(["customer"]);
        }
      }
      else{
        console.log(res.message)
        this.message = res.message;
        this.loading = false;
      }
    })
    

  }

}
