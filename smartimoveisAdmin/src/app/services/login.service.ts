import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  validaSessao(){
    let token = localStorage.getItem("token");
    if(token == null || token == '' || token == 'undefined'){
      return false;
    }
    return true;
  }
}
