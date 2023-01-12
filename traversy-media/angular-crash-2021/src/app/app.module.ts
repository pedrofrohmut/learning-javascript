import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms"

import { AppComponent } from "./app.component"
import { HeaderComponent } from "./components/header/header.component"
import { ButtonComponent } from "./components/button/button.component"
import { TaskListComponent } from "./components/task-list/task-list.component"
import { AddTaskFormComponent } from "./components/add-task-form/add-task-form.component"
import { AboutComponent } from "./components/about/about.component"
import { NavbarComponent } from "./components/navbar/navbar.component"
import { HomeComponent } from "./components/home/home.component"
import { SigninComponent } from "./components/signin/signin.component"
import { SignupComponent } from "./components/signup/signup.component"
import { AppRoutingModule } from "./app-routing.module"
import { ToastrModule } from "ngx-toastr"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

@NgModule({
  declarations: [
    AboutComponent,
    AddTaskFormComponent,
    AppComponent,
    ButtonComponent,
    HeaderComponent,
    HomeComponent,
    NavbarComponent,
    SigninComponent,
    SignupComponent,
    TaskListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
