import { Component } from '@angular/core';
import { Admin } from '../Model/admin';
import { UserAuthService } from '../services/user-auth.service';
import { AdminService } from '../services/admin.service';
import { ProfileImageService } from '../services/profile-image.service';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-admin',
  templateUrl: './account-admin.component.html',
  styleUrls: ['./account-admin.component.css']
})
export class AccountAdminComponent {
  admin: Admin = new Admin();
  editMode: boolean = false;

  constructor(private userAuthService: UserAuthService,private adminService: AdminService,private fileService:ProfileImageService) {}
  

  ngOnInit(): void {
    this.loadAdminDetails();
  }

  onFileSelected(event: any, fileInput: HTMLInputElement, profileImage: string, adminId: number): void {
    const file: File = event.target.files[0];
    if (file.size <= 1048576) {
      this.onUpdateProfile(event, profileImage, adminId);
    } else {
      alert('Image size must be less than 1MB.');
      fileInput.value = '';
    }
  }
  

  loadAdminDetails() {
    this.admin.adminId = this.userAuthService.getAdmin().adminId;
    this.admin.profileImage=this.userAuthService.getAdmin().profileImage;
    this.admin.adminFirstName = this.userAuthService.getAdmin().adminFirstName;;
    this.admin.adminLastName = this.userAuthService.getAdmin().adminLastName;
    this.admin.email = this.userAuthService.getAdmin().email;
    this.admin.password = '********';
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    console.log('Saving changes:', this.admin);
    if(this.admin.password.length<8){
      alert("Password must be atleast 8 characters long")
    }
    this.adminService.updateAccount(this.admin).subscribe((status)=>{
      if(status ===true){
        alert("Account updated successfully");
        this.userAuthService.setAdmin(this.admin);
      }else{
        alert("Account not updated,Something went wrong");
      }
    });
    this.toggleEditMode();
  }
  onUpdateProfile(event: any, fileName: string, adminId: number) {
    const file: File = event.target.files[0];
    console.log("FileName: ", file.name);
    this.userAuthService.setAdminProfileImage(this.admin.adminId+'_'+file.name);
    this.fileService.updateProfileImage(file, fileName, adminId).subscribe(
      response => {
        alert('Profile image updated successfully');
        console.log('Profile image updated successfully', JSON.stringify(response))
      },
      error => {
        console.error('Error updating profile image:', error);
        alert('Error updating profile image: ' + error.message);
      }
    );
  }
  onDeleteFile(fileName: string, adminId: number) {
    console.log(fileName);
    this.userAuthService.setAdminProfileImage("null");
    this.fileService.deleteFile(fileName, adminId).subscribe(
      response => {
        if (response) {
          alert('Profile Picture removed successfully');
          console.log('Profile image removed successfully', JSON.stringify(response));
        } else {
          alert('Failed to delete file');
        }
      },
      error => {
        alert('Error deleting file:'+ error.message);
      }
    );
  }


}
