import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MultiSelectAllComponent } from "./multi-select-all.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatSelectModule, MatSelect, MatSelectChange } from "@angular/material";
import { By } from "@angular/platform-browser";

describe("MultiSelectAllComponent", () => {
  let component: MultiSelectAllComponent<string>;
  let fixture: ComponentFixture<MultiSelectAllComponent<string>>;
  let formControl: FormControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiSelectAllComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      MultiSelectAllComponent
    ) as ComponentFixture<MultiSelectAllComponent<string>>;
    formControl = new FormControl();
    component = fixture.componentInstance;
    component.control = formControl;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit selection change and change All option to enabled", () => {
    spyOn(component.selectionChange, "emit");
    const input = fixture.debugElement.query(By.directive(MatSelect));
    input.triggerEventHandler(
      "selectionChange",
      new MatSelectChange(null, [component.allOptionValue, 1, 2, 3])
    );
    expect(component.selectionChange.emit).toHaveBeenCalledWith([1, 2, 3]);
    expect(component.allOptionDisabled).toBeFalsy();
  });

  it("should emit All selection change value when no option selected", () => {
    spyOn(component.selectionChange, "emit");
    component.control.setValue([1]);
    component.allOptionDisabled = false;
    const input = fixture.debugElement.query(By.directive(MatSelect));
    input.triggerEventHandler("selectionChange", new MatSelectChange(null, []));

    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      component.allOptionValue
    );
    expect(component.allOptionDisabled).toBeTruthy();
  });

  it("should emit All selection change value when All option enabled", () => {
    spyOn(component.selectionChange, "emit");
    component.allOptionDisabled = false;
    component.control.setValue([1]);
    const input = fixture.debugElement.query(By.directive(MatSelect));
    input.triggerEventHandler(
      "selectionChange",
      new MatSelectChange(null, [component.allOptionValue, 1])
    );
    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      component.allOptionValue
    );
  });
});
