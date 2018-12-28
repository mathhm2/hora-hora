import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  loginError = '';
  loginForm: FormGroup;

  modalRef: BsModalRef;
  rescueEmail: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  loginWithEmail() {
    this.authService.emailLogin(this.user.email, this.user.password)
      .then(() => this.toastr.success('entrou'))
      .catch((error) => this.toastr.error(error.message));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.toastr.success('entrou');
  }

  resetPassword() {
    this.authService.passwordReset(this.rescueEmail)
      .then(() => {
        this.modalRef.hide();
        console.log("email sent");
      })
      .catch((error) => console.log(error));
  }

}
