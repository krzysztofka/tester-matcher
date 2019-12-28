import { FormControl } from "@angular/forms";
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "multi-select-all",
  templateUrl: "./multi-select-all.component.html",
  styleUrls: ["./multi-select-all.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectAllComponent<T> {
  allOptionDisabled = true;

  @Output() selectionChange = new EventEmitter<T>();

  @Input() label: string;
  @Input() control: FormControl;
  @Input() options: T[];
  @Input() allOptionValue: string = "";
  @Input() labelFn: (v: T) => any = v => v;
  @Input() valueFn: (v: T) => any = v => v;

  constructor() {}

  onSeletionChange(values: any[]) {
    const allOptionIndex = values.indexOf(this.allOptionValue);
    if (!values.length || (!this.allOptionDisabled && allOptionIndex >= 0)) {
      this.control.patchValue(this.allOptionValue);
      this.allOptionDisabled = true;
    } else if (allOptionIndex >= 0) {
      values.splice(allOptionIndex, 1);
      this.control.patchValue(values);
      this.allOptionDisabled = false;
    }

    this.selectionChange.emit(this.control.value);
  }
}
