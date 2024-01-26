import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showElement = false;
  title = 'crew-app';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Check if it's the first page
      this.showElement = event.url === '/';
    });
  }
}
