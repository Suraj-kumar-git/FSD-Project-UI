import { Component } from '@angular/core';
import { Login } from '../Model/Login';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userAuthService:UserAuthService, private userService: UserService,private router:Router) {}

  role:string="";
  doLogin(loginData:Login){
    this.role=loginData.role;
    this.userService.login(loginData).subscribe((response:any)=>{
      this.userAuthService.setToken(response.jwtToken);
      if(this.role==="ADMIN"){
        this.userAuthService.setAdmin(response.admin);
        this.userAuthService.setRole(this.role);
        this.router.navigate(['/admin/home']);
        // window.location.reload();
      }
      if(this.role==="USER"){
        this.userAuthService.setRole(response.customer.role);
        this.userAuthService.setCustomer(response.customer);
        this.router.navigate(['/customer/home']);
        // window.location.reload();
      }
      this.userAuthService.setTokenExpiresIn(60);
    },()=>alert("Wrong Credentials for "+this.role));
  }
}
