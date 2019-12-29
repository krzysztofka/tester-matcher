import { TesterRankSearchComponent } from "./tester-rank-search/tester-rank-search.component";
import { TesterRankSearchCriteria } from "./model/tester-rank-search-criteria";
import { Page, Pageable } from "./../common/page";
import { environment } from "./../../environments/environment";
import { TesterRankModule } from "./tester-rank.module";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TesterRankComponent } from "./tester-rank.component";
import { TesterRankService } from "./tester-rank.service";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { TesterRank } from "./model/tester-rank";
import { By } from "@angular/platform-browser";
import { MatPaginator, PageEvent } from "@angular/material";
import { Subscription } from "rxjs";

describe("TesterRankComponent", () => {
  let httpMock: HttpTestingController;
  let component: TesterRankComponent;
  let fixture: ComponentFixture<TesterRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [TesterRankService],
      imports: [TesterRankModule, HttpClientTestingModule, NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.get(HttpTestingController);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should init with tester ranks", () => {
    const expectedPage = new Page<TesterRank>(new Pageable(), [
      new TesterRank()
    ]);

    httpMock
      .expectOne({
        method: "GET",
        url: `${environment.urlAddress}/tester-ranks/page?page=0&size=5`
      })
      .flush(expectedPage);

    expect(component.page).toEqual(expectedPage);
  });

  it("should reload page on onPageChanged", () => {
    const pageEvent = { ...new PageEvent(), pageSize: 6, pageIndex: 1 };
    fixture.debugElement
      .query(By.directive(MatPaginator))
      .triggerEventHandler("page", pageEvent);

    const expectedPage = new Page<TesterRank>(new Pageable(), [
      new TesterRank()
    ]);

    httpMock
      .expectOne({
        method: "GET",
        url: `${environment.urlAddress}/tester-ranks/page?page=1&size=6`
      })
      .flush(expectedPage);

    expect(component.page).toEqual(expectedPage);
  });

  it("should reload page on criteria change", () => {
    const searchCriteria = new TesterRankSearchCriteria(["US"]);
    fixture.debugElement
      .query(By.directive(TesterRankSearchComponent))
      .triggerEventHandler("searchCriteriaChanged", searchCriteria);

    const expectedPage = new Page<TesterRank>(new Pageable(), [
      new TesterRank()
    ]);

    httpMock
      .expectOne({
        method: "GET",
        url: `${environment.urlAddress}/tester-ranks/page?page=0&size=5&countryCodes=US`
      })
      .flush(expectedPage);

    expect(component.page).toEqual(expectedPage);
  });

  it("should cancel previous subscription on page reload", () => {
    const subscritpion: Subscription = component["testerRanksSubscription"];
    const pageEvent = { ...new PageEvent(), pageSize: 6, pageIndex: 1 };
    fixture.debugElement
      .query(By.directive(MatPaginator))
      .triggerEventHandler("page", pageEvent);

    expect(subscritpion.closed).toBeTruthy();
  });
});
