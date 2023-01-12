import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

import type { NewTask, Task } from "../types"

@Injectable({
  providedIn: "root"
})
export class TaskService {
  private readonly URL = "http://localhost:5000/tasks"
  private readonly httpClient: HttpClient

  public tasks: Task[]

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  getTasks() {
    return this.httpClient.get<Task[]>(this.URL)
  }

  deleteTask(taskId: string) {
    return this.httpClient.delete(`${this.URL}/${taskId}`)
  }

  toggleTaskReminder(task: Task) {
    return this.httpClient.put(
      `${this.URL}/${task.id}`,
      Object.assign(task, { hasReminder: !task.hasReminder })
    )
  }

  addTask(newTask: NewTask) {
    return this.httpClient.post(this.URL, newTask)
  }
}
