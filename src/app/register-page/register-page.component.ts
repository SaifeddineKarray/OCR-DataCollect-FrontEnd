import { Component, OnInit } from '@angular/core';
import { registerattempt } from '../models/data/registerattempt.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../shared/services/auth.service';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  newuser: registerattempt = {
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  };
  
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor( 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { 
      // redirect to home if already logged in
      if (this.authenticationService.userValue) {
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }

    get f() { return this.loginForm.controls; }

  onSubmit() {
    
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.newuser.firstname = this.f['firstname'].value;
    this.newuser.lastname = this.f['lastname'].value;
    this.newuser.username = this.f['username'].value;
    this.newuser.password = this.f['password'].value;

    this.authenticationService.register(this.newuser)
    .subscribe({
      next: (okay) => {
        console.log(okay);
        this.authenticationService.login(this.newuser.username,this.newuser.password)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                  },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
      },
      error: error => {
        this.error = error;
        this.loading = false;
      }
    });
}
}
