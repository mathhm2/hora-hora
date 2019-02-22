import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { first } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  subcribeLogin: any;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  submittedRescuePassword = false;

  forgetPasswordModalRef: BsModalRef;
  emailError: string = null;
  passwordError: string = null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private loginService: LoginService,
    private router: Router
  ) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.logout();
  }

  ngOnDestroy() { }

  get formLogin() {
    if (this.loginForm.controls.email.status == "VALID") {
      this.loading = false;
    }
    return this.loginForm.controls;
  }

  openForgetPasswordModal(template: TemplateRef<any>) {
    this.forgetPasswordModalRef = this.modalService.show(template);
  }


  loginWithEmail() {
    this.submitted = true;
    this.loading = true;


    // stop here if form is invalid
    if (this.loginForm.invalid) { return; }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/point'])
        },
        error => {
          alert('informações erradas');
          this.loading = false;
        }
      );

    // this.loginService.getLogin(this.loginForm.value)
    //   .subscribe(
    //     res => {
    //       if (res['code'] == "auth/login-success") {
    //         this.router.navigate(['/point']);
    //       } else {
    //         alert('Erro Login');
    //         console.log(res);
    //       }
    //     },
    //     err => {
    //       console.log(err.error.errors);
    //       alert(err.error.errors);
    //       this.loading = false;
    //     }
    //   );

  }





}
