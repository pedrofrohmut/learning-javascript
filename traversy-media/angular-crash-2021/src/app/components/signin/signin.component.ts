import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
// import { Subscription } from "rxjs"
import { AuthService } from "src/app/services/auth.service"
import { User } from "src/app/types"

@Component({
  selector: "app-signin",
  template: `
      <div class="page-title">Sign In</div>
      <form (submit)="handleSubmit()">
        <div class="form-control">
          <label>E-mail</label>
          <input [(ngModel)]="email" name="email" type="text" required />
        </div>
        <div class="form-control">
          <label>Password</label>
          <input [(ngModel)]="password" name="password" type="password" required />
        </div>
        <div class="form-control">
          <button type="submit" class="btn">Submit</button>
        </div>
      </form>

    <div style="margin-top: 2em; font-size: 2rem; color: white">
      <pre>{{authUserParsed}}</pre>
    </div>
  `,
  styles: [
    `
      .page-title {
        margin-bottom: 0.5em;
        font-size: 3rem;
      }
    `
  ]
})
export class SigninComponent implements OnInit {
  private readonly authService: AuthService
  private readonly router: Router

  authUserParsed: string

  authUser: User
  // subscription: Subscription

  // FORM
  public email = ""
  public password = ""

  constructor(router: Router, authService: AuthService) {
    this.router = router
    this.authService = authService
    // this.subscription = this.authService
    //   .onSetAuthUser()
    //   .subscribe((value) => (this.authUser = value))
  }

  ngOnInit(): void {
    this.authUser = this.authService.getAuthUser()
    this.authUserParsed = JSON.stringify(this.authUser, null, 8)
    // if (!this.authUser) {
    //   console.log("Redirecting....")
    //   this.router.navigate(["about"])
    // }
  }

  // handleClick() {
  //   console.log("CLICK!!!")
  //   this.authService.setAuthUser({ id: "1234", name: "Bob Dylan", email: "bob@dylan.com" })
  //   this.authUser = this.authService.getAuthUser()
  // }

  handleSubmit() {
    const { email, password } = this
    console.log(email, password)
    localStorage.setItem("user", JSON.stringify({ email }))
    // this.authService.setAuthUser({ id: "123", name: "Username", email })
    // this.router.navigate(["/"])
  }
}
