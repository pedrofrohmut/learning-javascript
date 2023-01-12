import { Injectable } from "@angular/core"
import { Subject } from "rxjs"
import type { User } from "../types"

@Injectable({
  providedIn: "root"
})
export class AuthService {
  // private authUser = { id: "123", name: "John Doe", email: "john@doe.com" }
  private authUser = null
  private subject = new Subject<any>()

  constructor() {}

  setAuthUser(user: User) {
    console.log("SET AUTH USER", this.authUser)
    this.authUser = user
    console.log("AuSer User", this.authUser)
    this.subject.next(this.authUser)
  }

  onSetAuthUser() {
    return this.subject.asObservable()
  }

  getAuthUser() {
    return this.authUser
  }
}
