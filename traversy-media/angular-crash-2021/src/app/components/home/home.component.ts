import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { TaskService } from "../../services/task.service"
import type { NewTask, Task } from "../../types"

@Component({
  selector: "app-home",
  template: `
    <app-header
      class="header"
      [isFormOpen]="isFormOpen"
      (toggleFormOpen)="handleToggleFormOpen()"
    ></app-header>
    <app-add-task-form *ngIf="isFormOpen" (addTask)="handleAddTask($event)"></app-add-task-form>
    <app-task-list
      class="task-list"
      [tasks]="tasks"
      (deleteTask)="handleDelete($event)"
      (toggleReminder)="handleToggleReminder($event)"
    ></app-task-list>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  private readonly taskService: TaskService
  private readonly router: Router

  public tasks = []
  public isFormOpen = false
  public authUser = true

  constructor(taskService: TaskService, router: Router) {
    this.taskService = taskService
    this.router = router
  }

  ngOnInit() {
    if (!this.authUser) {
      console.log("Redirecting....")
      this.router.navigate(["about"])
    }
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks
    })
  }

  handleDelete(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe()
    this.tasks = this.tasks.filter((task) => task.id !== taskId)
  }

  handleToggleReminder(task: Task) {
    this.taskService.toggleTaskReminder(task).subscribe()
  }

  handleAddTask(newTask: NewTask) {
    const { text, day, hasReminder } = newTask
    this.taskService.addTask({ text, day, hasReminder }).subscribe((addedTask: Task) => {
      this.tasks.push(addedTask)
    })
    this.isFormOpen = false
  }

  handleToggleFormOpen() {
    this.isFormOpen = !this.isFormOpen
  }
}
