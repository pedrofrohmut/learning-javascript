import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router"
import { ToastrService } from "ngx-toastr"

@Injectable({
  providedIn: "root"
})
export class GuestGuard implements CanActivate {
  private readonly router: Router
  private readonly toastr: ToastrService

  constructor(router: Router, toastr: ToastrService) {
    this.router = router
    this.toastr = toastr
  }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const localStorageUser = JSON.parse(localStorage.getItem("user"))
    console.log("Guest Guard", localStorageUser)
    if (localStorageUser) {
      this.router.navigate(["/"])
      this.toastr.info("You can't access guest routes when logged in")
      return false
    }
    return true
  }
}
