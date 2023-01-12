import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router"
import { ToastrService } from "ngx-toastr"

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  private readonly router: Router
  private readonly toastr: ToastrService

  constructor(router: Router, toastr: ToastrService) {
    this.router = router
    this.toastr = toastr
  }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const localStorageUser = JSON.parse(localStorage.getItem("user"))
    console.log("Auth Guard", localStorageUser)
    if (!localStorageUser) {
      this.router.navigate(["/signin"])
      this.toastr.info("Please Sign In to access this page")
      return false
    }
    return true
  }
}
