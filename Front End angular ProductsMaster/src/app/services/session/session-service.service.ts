import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  constructor() { }

  getSession(){
    return sessionStorage.getItem('LoginType');
  }
}
