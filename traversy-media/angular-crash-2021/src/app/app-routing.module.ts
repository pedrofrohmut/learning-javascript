import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { HomeComponent } from "./components/home/home.component"
import { AboutComponent } from "./components/about/about.component"
import { SigninComponent } from "./components/signin/signin.component"
import { SignupComponent } from "./components/signup/signup.component"
import {AuthGuard} from "./auth.guard"
import {GuestGuard} from "./guest.guard"

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "about", component: AboutComponent },
  { path: "signin", component: SigninComponent, canActivate: [GuestGuard] },
  { path: "signup", component: SignupComponent, canActivate: [GuestGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
