import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { Subscription } from "rxjs"
import { AuthService } from "src/app/services/auth.service"
import type { User } from "src/app/types"

@Component({
  selector: "app-header",
  template: `
    <header>
      <h1>{{ title }}</h1>
      <app-button
        color="var(--bgColor-300)"
        textColor="var(--textColor)"
        [text]="text"
        (btnClick)="hadleBtnClick()"
      ></app-button>
    </header>
  `,
  styles: [
    `
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1em;
      }
    `
  ]
})
export class HeaderComponent implements OnInit {
  private readonly authService: AuthService

  public title = "Task Tracker"
  public text = "Add"

  authUser: User
  subscription: Subscription

  @Output() toggleFormOpen = new EventEmitter()
  @Input() isFormOpen: boolean

  constructor(authService: AuthService) {
    this.authService = authService
  }

  ngOnInit(): void {}

  hadleBtnClick() {
    // this.authService.setAuthUser(null)
    this.text = this.isFormOpen ? "Add" : "Close"
    this.toggleFormOpen.emit()
  }
}
