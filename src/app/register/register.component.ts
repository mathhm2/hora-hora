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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  backToLogin() {
    this.router.navigate(['/login'])
  }

}
