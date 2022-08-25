import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {

  constructor(private http:HttpClient) { }

  Login(){

  }

  async signUp(Username:any,Password:any,userType:any){
    let status= false;
    const available =this.http.post(environment.url+"/api/users",{Username});
    const res1 = await firstValueFrom(available);

    if(res1){
      const res =  this.http.post<{ message: string, response: any }>(environment.url+"/api/login",{Username,Password,userType}).subscribe(data => {
        if(data.message.length > 0){
          status = true;
        }
      });
      return status;
    }
    else{
      return false;
    }
    return true;
  }
}
