import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  // loginForm: FormGroup;
  loading = false;
  submitted = false;
  checked1 = true;
  checked2 = false;
  userType = "Admin";
  message = "";
  picture :any="";
  loginForm = new FormGroup({
    UPID: new FormControl('',{validators:[Validators.required]}),
    Name: new FormControl('',{validators:[Validators.required]}),
    Image: new FormControl(null,{validators:[Validators.required]})
  })
  constructor(private router:Router,private formBuilder:FormBuilder,private http:HttpClient,private sanitizer: DomSanitizer) { 
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
  
  this.message = "";
  }

  LOGOUT(){
    sessionStorage.clear();
    this.router.navigate(["/"]);
  }

  img(event:Event){
    const file = (event.target as  HTMLInputElement).files[0];
    this.loginForm.get('Image').patchValue(file); 
    console.log(file);
    this.picture = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    );
    console.log(this.loginForm)
  }
  onSubmit(){
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;

    let allItems = {

      UPID:this.loginForm.get('UPID').value,
      Name:this.loginForm.get('Name').value,
      Image:this.loginForm.get('Image').value
    }
    const formData: FormData = new FormData();
    formData.append('UPID',allItems.UPID);
    formData.append('Name',allItems.Name);
    formData.append('Image', allItems.Image, allItems.Image.name);
    console.log(allItems);
    console.log(formData);
    this.http.post(environment.url+"/api/master/index",{UPID:this.loginForm.get('UPID').value}).subscribe((val:any) => {
      if(val.user.length == 0){
        this.http.post(environment.url+"/api/master/store",formData).subscribe((data) => {
          console.log(data);
          this.loading = false;
          this.loginForm.controls['Image'].setValue("");
          this.loginForm.controls['UPID'].setValue("");
          this.loginForm.controls['Name'].setValue("");
          this.picture = "";
          alert("Product Master Added Succefully...");
        });
      }
      else{
        this.loading = false;
        this.loginForm.controls['UPID'].setValue("");
        alert("Unique Product ID Already Available");
      }
    })

  }
}
