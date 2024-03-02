import { Component } from '@angular/core';
import { LoanApplications } from '../Model/LoanApplications';
import { CustomerService } from '../services/customer.service';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-loans',
  templateUrl: './customer-loans.component.html',
  styleUrls: ['./customer-loans.component.css']
})
export class CustomerLoansComponent {
  loanApplication :LoanApplications[] = [];
  tempLoanApplication :LoanApplications[] = [];
  searchValue='';

  constructor(private customerService:CustomerService, private userAuthservice:UserAuthService,private router:Router){}

  ngOnInit(){
    this.getAllAppliedLoan();
  }
  customerId = this.userAuthservice.getCustomer().customerId;
  isEdit = false;
  
    // getAllAppliedLoan(){
      
    //   this.customerService.getAppliedLoans(this.customerId).subscribe(
    //     (response)=>{
    //       // this.loanApplication.at = response;
          
    //        this.loanApplication[0].loanTypeName = response[0].loanType.loanTypeName;
    //       console.log(response);
          
    //     }
    //   )
      
    // }
    
    getAllAppliedLoan(){
      
    this.customerService.getAppliedLoans(this.customerId).subscribe(
      response => {
        this.loanApplication = response.map(loan => {
          return {
            ...loan,
            loanTypeName: loan.loanType.loanTypeName,
            tenure:loan.tenureInMonths
          };
        });
        console.log(this.loanApplication);
      }
    );
  
  }
  
  
  onSearch(){
    if(this.searchValue){
    this.tempLoanApplication = this.loanApplication.filter(loan=>(
      loan.principal.toString().includes(this.searchValue) || loan.loanId.toString().includes(this.searchValue) ||
      loan.loanTypeName.toLowerCase().includes(this.searchValue) || loan.status.toLowerCase().includes(this.searchValue)
      ))
    }else{
      this.tempLoanApplication = [];
    }
  }
  reset(){
    this.searchValue='';
    this.tempLoanApplication = [];
  }
  
  updateLoan(loanId:number){
    console.log(loanId);
    this.router.navigate(['customer/update-applied-loan',loanId])
  }
  cancelLoan(id:number){
    this.router.navigate(['customer/cancel-applied-loan',id])
  }

  
}
