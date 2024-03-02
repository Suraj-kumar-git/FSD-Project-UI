import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-calculate-emi',
  templateUrl: './calculate-emi.component.html',
  styleUrls: ['./calculate-emi.component.css']
})
export class CalculateEmiComponent {
  constructor(private route:ActivatedRoute,private customerService:CustomerService, private router:Router){}
  selectedLoan!:string;
  loanInterestRate!:number;
  ngOnInit(){
    this.status();
  }
  status(){
    this.route.params.subscribe(params => this.selectedLoan = params['loanTypeName']);
  }

  submitForm(data:any){
    console.log(data.loanAmount+" "+ data.loanDuration+ " " + this.loanInterestRate+" "+this.selectedLoan);
    this.customerService.calculateEMI(data.loanAmount, data.loanDuration,this.selectedLoan)
    .subscribe(
      (response)=>{
        alert("Your estimated emi will be: "+ response);
        this.router.navigate(['customer/home']);
        console.log(response);
      }
    );
  }
}
