import { environment } from "./../../environments/environment";
import { TesterRankSearchCriteria } from "./model/tester-rank-search-criteria";
import { Page, Pageable } from "./../common/page";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { TestBed, getTestBed } from "@angular/core/testing";

import { TesterRankService } from "./tester-rank.service";
import { TesterRank } from "./model/tester-rank";

describe("TesterRankService", () => {
  let injector: TestBed;
  let service: TesterRankService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TesterRankService]
    });
    injector = getTestBed();
    service = injector.get(TesterRankService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return Observable<Page<TesterRank>> with empty search criteria", () => {
    const pageable = new Pageable(5, 3);
    const searchCriteria = new TesterRankSearchCriteria();
    const page = new Page<TesterRank>(pageable, [new TesterRank()]);

    service
      .getPage(pageable, searchCriteria)
      .subscribe(result => expect(result).toEqual(page));

    const req = httpMock.expectOne({
      method: "GET",
      url: `${environment.urlAddress}/tester-ranks/page?page=3&size=5`
    });

    req.flush(page);
  });

  it("should return Observable<Page<TesterRank>> with search criteria", () => {
    const pageable = new Pageable(5, 0);
    const searchCriteria = new TesterRankSearchCriteria(
      ["US", "JP"],
      ["2", "3", "10"]
    );
    const page = new Page<TesterRank>(pageable, [new TesterRank()]);

    service
      .getPage(pageable, searchCriteria)
      .subscribe(result => expect(result).toEqual(page));

    const req = httpMock.expectOne({
      method: "GET",
      url: `${environment.urlAddress}/tester-ranks/page?page=0&size=5&countryCodes=US&countryCodes=JP&deviceIds=2&deviceIds=3&deviceIds=10`
    });

    req.flush(page);
  });
});
