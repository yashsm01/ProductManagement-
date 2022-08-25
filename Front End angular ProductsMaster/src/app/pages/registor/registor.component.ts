import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registor',
  templateUrl: './registor.component.html',
  styleUrls: ['./registor.component.scss']
})
export class RegistorComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  checked1 = true;
  checked2 = false;
  userType = "Admin";
  available = false;
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
      password: ['', Validators.required],
      userType: ['Admin',Validators.required]
  });
  this.checked1 = true;
  this.checked2 = false;
  this.userType = "Admin";
  }

  onTypeChange(x: any){
    console.log(x," 1")
    this.checked1 = true;
    this.checked2 = false;

    console.log(this.checked1)
  }

  onType2Change(x: any){
    this.checked1 = false;
    this.checked2 = true;
    console.log(this.checked1)
  }

  onSubmit(){
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    if(this.checked1 == true){
      this.userType = "Admin"
    }
    else{
      this.userType = "Customer"
    }
    this.loading = true;
    this.http.post<{ message: string, response: any }>(environment.url+"/api/users",{Username:this.loginForm.controls['username'].value}).subscribe((data) => {
      console.log(data);
      if(data.message == "null"){
        this.http.post<{ message: any, response: any }>(environment.url+"/api/register",{Username:this.loginForm.controls['username'].value,Password:this.loginForm.controls['password'].value,userType:this.userType}).subscribe(res => {
          console.log(res)
            this.loading = false;
            this.loginForm.reset();
            this.router.navigate(["/"]);
          
        })
      }
      else
      {
       this.available = true;
        this.loading = false;
      }

    });

  
    //let status = loginServices.signUp(this.loginForm.controls['username'].value,this.loginForm.controls['password'].value,this.userType);

  }

}
