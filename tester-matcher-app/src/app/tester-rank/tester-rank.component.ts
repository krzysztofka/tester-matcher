import { environment } from "./../../environments/environment";
import { TesterRankSearchCriteria } from "./model/tester-rank-search-criteria";
import { SearchCriteria } from "./../common/search-criteria";
import { Page, Pageable } from "./../common/page";
import { TesterRankService } from "./tester-rank.service";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { TesterRank } from "./model/tester-rank";
import { PageEvent } from "@angular/material";
import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime, finalize } from "rxjs/operators";

@Component({
  selector: "app-tester-rank",
  templateUrl: "./tester-rank.component.html",
  styleUrls: ["./tester-rank.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TesterRankComponent implements OnInit {
  private _page: Page<TesterRank> = new Page();
  private pageable: Pageable = new Pageable();
  private searchCriteria = new TesterRankSearchCriteria();
  private loadingData = new BehaviorSubject<boolean>(false);

  private testerRankDebouncer: Subject<
    [Pageable, TesterRankSearchCriteria]
  > = new Subject<[Pageable, TesterRankSearchCriteria]>();

  public loading$ = this.loadingData.asObservable();

  constructor(private testerRankService: TesterRankService) {}

  ngOnInit() {
    this.loagPage(this.pageable, this.searchCriteria);
    this.testerRankDebouncer
      .pipe(debounceTime(environment.testerRankDebounceTime))
      .subscribe(value => this.loagPage(value[0], value[1]));
  }

  get page(): Page<TesterRank> {
    return this._page;
  }

  onPageChanged(event: PageEvent) {
    this.pageable = new Pageable(event.pageSize, event.pageIndex);
    this.testerRankDebouncer.next([this.pageable, this.searchCriteria]);
  }

  onSearchCriteriaChanged(searchCriteria: TesterRankSearchCriteria) {
    this.searchCriteria = searchCriteria;
    this.testerRankDebouncer.next([this.pageable, this.searchCriteria]);
  }

  private loagPage(pagable: Pageable, searchCriteria: SearchCriteria) {
    this.loadingData.next(true);
    this._page = { ...this._page, content: [] };
    this.testerRankService
      .getPage(pagable, searchCriteria)
      .pipe(finalize(() => this.loadingData.next(false)))
      .subscribe(p => (this._page = p));
  }
}