import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"

@Component({
  selector: "app-button",
  template: `
    <button
      [ngStyle]="{ 'background-color': color, color: textColor }"
      class="btn"
      (click)="handleClick()"
    >
      {{ text }}
    </button>
  `,
  styles: [``]
})
export class ButtonComponent implements OnInit {
  @Input() text: string
  @Input() color: string
  @Input() textColor: string
  @Output() btnClick = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  handleClick() {
    this.btnClick.emit()
  }
}
