import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TesterRankSearchComponent } from "./tester-rank-search.component";

describe("TesterRankSearchComponent", () => {
  let component: TesterRankSearchComponent;
  let fixture: ComponentFixture<TesterRankSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TesterRankSearchComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterRankSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
