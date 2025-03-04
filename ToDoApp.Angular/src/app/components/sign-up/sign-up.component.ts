import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm: FormGroup;
  constructor(private router : Router,private authenticationService : AuthenticationService,private formBuilder: FormBuilder)
  {
    this.signUpForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.authenticationService.register(this.signUpForm.value)
        .subscribe((data: any) => {
          alert("Register is Success");
           this.router.navigate(['/sign-in']);
        });
    }
  }
  onSignIn(){
    this.router.navigate(["/sign-in"]);
  }
}
