import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router:Router,private userAuthService: UserAuthService,private userService: UserService) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
  get isLoggedIn():boolean{
    return this.userAuthService.isLoggedIn();
  }

  public userRole(){
    return this.userAuthService.getRole();
  }

  public logout(){
    this.userAuthService.clearToken();
    this.router.navigate(['home']);
  }

  isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenu(){
    this.isMenuOpen= !this.isMenuOpen;
  }

  // @ViewChild('navBar') navBar!: ElementRef;
  // @ViewChild('menuBtn') menuBtn!: ElementRef;
  // @ViewChild('cancelBtn') cancelBtn!: ElementRef;
  // @ViewChild('body') body!: ElementRef; // Add this line

  // ngAfterViewInit() {
  //   // Move your JavaScript code here
  //   this.menuBtn.nativeElement.onclick = () => {
  //     this.navBar.nativeElement.classList.add('active');
  //     this.menuBtn.nativeElement.style.opacity = '0';
  //     this.menuBtn.nativeElement.style.pointerEvents = 'none';
  //     this.body.nativeElement.style.overflow = 'hidden';
  //     // Remove the next line as scrollBtn is not defined in your template
  //     // scrollBtn.style.pointerEvents = 'none';
  //   };

  //   this.cancelBtn.nativeElement.onclick = () => {
  //     this.navBar.nativeElement.classList.remove('active');
  //     this.menuBtn.nativeElement.style.opacity = '1';
  //     this.menuBtn.nativeElement.style.pointerEvents = 'auto';
  //     this.body.nativeElement.style.overflow = 'auto';
  //     // Remove the next line as scrollBtn is not defined in your template
  //     // scrollBtn.style.pointerEvents = 'auto';
  //   };

  //   // Side Navigation Bar Close While We Click On Navigation Links
  //   let navLinks = document.querySelectorAll(".menu li a");
  //   for (var i = 0; i < navLinks.length; i++) {
  //     navLinks[i].addEventListener("click", () => {
  //       this.navBar.nativeElement.classList.remove('active');
  //       this.menuBtn.nativeElement.style.opacity = '1';
  //       this.menuBtn.nativeElement.style.pointerEvents = 'auto';
  //       this.body.nativeElement.style.overflow = 'auto';
  //       // Remove the next line as scrollBtn is not defined in your template
  //       // scrollBtn.style.pointerEvents = 'auto';
  //       let target = document.querySelector(this.hash);
  //       let headerOffset = 70; // Adjust this value to match your header's height
  //       let elementPosition = target.offsetTop - headerOffset;

  //       window.scrollTo({
  //         top: elementPosition,
  //         behavior: "smooth"
  //       });
  //     });
  //   }
  // }
}
