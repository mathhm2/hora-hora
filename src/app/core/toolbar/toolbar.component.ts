import { Component, OnInit } from '@angular/core';
import { faBars, faBusinessTime } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {
  menuOpen = false;
  faBusinessTime = faBusinessTime;
  faBars = faBars;

  constructor() { }

  ngOnInit() { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
