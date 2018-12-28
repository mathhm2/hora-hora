import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isShowToolbar = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((e) => e instanceof ActivationEnd))
      .subscribe((e: ActivationEnd) => {
        this.handleRouteState(e.snapshot)
      });
  }

  handleRouteState(state: ActivatedRouteSnapshot): any {
    const data = state.data;

    if (data && data['toolbar'] !== undefined && data['toolbar'] === false) {
      this.hideToolbar();
    } else {
      this.showToolbar();
    }
  }

  hideToolbar() {
    this.isShowToolbar = false;
  }

  showToolbar() {
    this.isShowToolbar = true;
  }

}
