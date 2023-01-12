import { Component } from "@angular/core"

@Component({
  selector: "app-root",
  template: `
    <app-navbar></app-navbar>
    <div class="page-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  constructor() {}

  ngOnInit() {}
}
