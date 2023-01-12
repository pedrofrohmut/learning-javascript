import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"

@Component({
  selector: "app-task-list",
  template: `
    <div *ngFor="let task of tasks">
      <div
        class="task"
        [ngClass]="task.hasReminder && 'reminder'"
        (dblclick)="handleToggleReminder(task)"
      >
        <h3>
          {{ task.text }}
          <span>
            <label for="deleteX">Delete</label>
            <i id="deleteX" (click)="handleDelete(task.id)" class="fa-solid fa-xmark"></i>
          </span>
        </h3>
        <p>{{ task.day }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .task {
        background-color: var(--bgColor-400);
        padding: 0.8em 1.6em;
        margin-bottom: 1.0em;
        cursor: pointer;
        border-left: 3px solid var(--textColor);
        border-bottom: 3px solid var(--textColor);
        border-radius: var(--borderRadius);
      }

      .reminder {
        border-left: 3px solid var(--green);
        border-bottom: 3px solid var(--green);
      }

      .task h3 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.0rem;
      }

      .task p {
        font-size: 0.9rem;
      }

      .task span {
        font-size: 0.9rem;
        font-weight: 400;
        opacity: 0.7;
      }

      .task i {
        font-size: 1.2rem;
        font-weigth: 600;
        position: relative;
        top: 0.1em;
        padding-left: 0.3em;
      }
    `
  ]
})
export class TaskListComponent implements OnInit {
  @Input() tasks = []

  @Output() deleteTask = new EventEmitter()
  @Output() toggleReminder = new EventEmitter()

  constructor() {}

  ngOnInit() {}

  handleDelete(taskId: string) {
    this.deleteTask.emit(taskId)
  }

  handleToggleReminder(task: Task) {
    this.toggleReminder.emit(task)
  }
}
