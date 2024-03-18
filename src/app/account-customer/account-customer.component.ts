import { Component } from '@angular/core';
import { Customer } from '../Model/Customer';
import { UserAuthService } from '../services/user-auth.service';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { ProfileImageService } from '../services/profile-image.service';

@Component({
  selector: 'app-account-customer',
  templateUrl: './account-customer.component.html',
  styleUrls: ['./account-customer.component.css']
})
export class AccountCustomerComponent {
  indianStates: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
  ];
  customer = new Customer();
  editMode: boolean = false;
  constructor(private router: Router, private userAuthService: UserAuthService, private customerService: CustomerService,private fileService:ProfileImageService) { }

  ngOnInit() {
    this.loadCustomerDetails();
  }
  loadCustomerDetails() {
    this.customer = this.userAuthService.getCustomer();
    console.log(this.customer);
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  onFileSelected(event: any, fileInput: HTMLInputElement, profileImage: string, customerId: number): void {
    const file: File = event.target.files[0];
    if (file.size <= 1048576) {
      this.onUpdateProfile(event, profileImage, customerId);
    } else {
      alert('Image size must be less than 1MB.');
      fileInput.value = '';
    }
  }
  saveChanges() {
    console.log('Saving changes:', this.customer);
    this.toggleEditMode();

    this.customerService.updateAccount(this.customer).subscribe(
      (response) => {
        if (response) {
          this.userAuthService.setCustomer(this.customer);
          this.router.navigate(['home'])
        } else {
          alert("couldn't save changes");
        }
      },
    );
  }

  onUpdateProfile(event: any, fileName: string, customerId: number) {
    const file: File = event.target.files[0];
    console.log("FileName: ", file.name);
    this.userAuthService.setCustomerProfileImage(this.customer.customerId+'_'+file.name);
    this.fileService.updateProfileImage(file, fileName, customerId).subscribe(
      response => {
        alert('Profile image updated successfully');
        window.location.reload();
        console.log('Profile image updated successfully', JSON.stringify(response))
      },
      error => {
        console.error('Error updating profile image:', error);
        window.location.reload();
        alert('Error updating profile image: ' + error.message);
      }
    );
  }
  onDeleteFile(fileName: string,customerId:number) {
    console.log(fileName);
    this.userAuthService.setCustomerProfileImage("null");
    this.fileService.deleteFile(fileName, customerId).subscribe(
      response => {
        alert('Profile Picture removed successfully');
        console.log('Profile image removed successfully', JSON.stringify(response))
      },
      error => {
        alert('Error deleting file:'+ error.message);
      }
    );
  }
}
