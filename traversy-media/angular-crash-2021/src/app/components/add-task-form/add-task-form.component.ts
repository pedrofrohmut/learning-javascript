import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"

@Component({
  selector: "app-add-task-form",
  template: `
    <form (ngSubmit)="handleSubmit()">
      <div class="form-control">
        <label>Task</label>
        <input
          [(ngModel)]="text"
          type="text"
          name="text"
          id="text"
          placeholder="Add task"
          required
        />
      </div>
      <div class="form-control">
        <label>Day & Time</label>
        <input
          [(ngModel)]="day"
          type="text"
          name="day"
          id="day"
          placeholder="Day & time"
          required
        />
      </div>
      <div class="form-control-check">
        <label for="reminder">Set reminder</label>
        <input [(ngModel)]="hasReminder" id="reminder" type="checkbox" name="reminder" />
      </div>
      <div class="form-control">
        <button type="submit" class="btn">Submit</button>
      </div>
    </form>
  `,
  styles: [`
    form {
      margin: 0 0 2.5rem 0;
    }
  `]
})
export class AddTaskFormComponent implements OnInit {
  public text = ""
  public day = ""
  public hasReminder = false

  @Output() addTask = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  handleSubmit() {
    const { text, day, hasReminder } = this
    this.addTask.emit({ text, day, hasReminder })
    this.text = ""
    this.day = ""
    this.hasReminder = false
  }
}
