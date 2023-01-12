import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"

@Component({
  selector: "app-signup",
  template: ` <p>signup works!</p> `,
  styles: []
})
export class SignupComponent implements OnInit {
  private readonly router: Router
  authUser = true

  constructor(router: Router) {
    this.router = router
  }

  ngOnInit(): void {
    if (!this.authUser) {
      console.log("Redirecting....")
      this.router.navigate(["about"])
    }
  }
}
