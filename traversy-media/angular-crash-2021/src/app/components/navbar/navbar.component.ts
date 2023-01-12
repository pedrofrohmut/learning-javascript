import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-navbar",
  template: `
    <nav>
      <div class="links">
        <a routerLink="/">Home</a>
        <a routerLink="/about">About</a>
        <a routerLink="/signin">Sign In</a>
        <a routerLink="/signup">Sign Up</a>
      </div>
    </nav>
  `,
  styles: [
    `
      .links {
        margin: 2rem auto;
        width: 340px;
      }

      nav a {
        color: var(--textColor);
        padding: 1em;
      }
    `
  ]
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
