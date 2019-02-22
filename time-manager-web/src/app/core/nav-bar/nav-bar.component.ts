import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  navBar = [];

  constructor(private router: Router) {
    this.getURL();
  }

  ngOnInit() {

  }

  getURL() {
    for (let i = 0; i < this.router.config.length; i++) {
      if (this.router.config[i].path.length > 0 && this.router.config[i].path !== "login") {
        this.navBar.push(this.router.config[i].path);
      }
    }
  }
}
