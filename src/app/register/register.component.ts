import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  user: { email: string; password: string; confirmPassword: string; };

  constructor(private authService: AuthService) {
    this.user = {
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  ngOnInit() {
  }

  cadastrarUsuario() {
    let password = null;
    if (this.user.password != this.user.confirmPassword) {
      return;
    } else {
      password = this.user.password;
    }

    this.authService.emailSignUp(this.user.email, password)
      .then(() => console.log('Sucesso'))
      .catch((error) => console.log(error))
  }

}
