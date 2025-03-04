import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { FormGroup, ReactiveFormsModule, Validators,FormBuilder } from '@angular/forms';
import { User } from '../../models/user';
import { CookieService } from '../../shared/services/cookie/cookie.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInForm: FormGroup;
  ngOnInIt(){
    if(this.cookieService.get('token')!=null){
      this.router.navigate(["/main"]);
    }
  }
  constructor(private router : Router,private authenticationService : AuthenticationService,private formBuilder: FormBuilder,private cookieService: CookieService)
  {
    this.signInForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.signInForm.valid) {
      this.authenticationService.login(this.signInForm.value).subscribe(
        (data: any) => {
          alert("Login successful");
          this.cookieService.set('token',data.token);
          this.router.navigate(["/main"]);
        },
        (error) => {
          alert("Login Failed");
        }
      );
    }
  }

  onSignUp(){
    this.router.navigate(["/sign-up"]);
  }
}
