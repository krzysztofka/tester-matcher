import { environment } from "./../../environments/environment";
import { TesterRankSearchCriteria } from "./model/tester-rank-search-criteria";
import { Page, Pageable } from "./../common/page";
import { TesterRankService } from "./tester-rank.service";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { TesterRank } from "./model/tester-rank";
import { PageEvent } from "@angular/material";
import { BehaviorSubject, Subject, Observable } from "rxjs";
import { debounceTime, finalize, switchMap, tap } from "rxjs/operators";

@Component({
  selector: "tester-rank",
  templateUrl: "./tester-rank.component.html",
  styleUrls: ["./tester-rank.component.css"],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TesterRankComponent implements OnInit, OnDestroy {
  page: Page<TesterRank> = new Page();
  private pageable: Pageable = new Pageable();
  private searchCriteria = new TesterRankSearchCriteria();
  private loadingData = new BehaviorSubject<boolean>(false);

  private testerRankThrottler: Subject<
    [Pageable, TesterRankSearchCriteria]
  > = new Subject<[Pageable, TesterRankSearchCriteria]>();

  public loading$ = this.loadingData.asObservable();

  constructor(
    private testerRankService: TesterRankService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.testerRankThrottler
      .pipe(
        tap(v => this.loadingData.next(true)),
        tap(v => (this.page = { ...this.page, content: [] })),
        debounceTime(environment.testerRankThrottleTime),
        switchMap(value => this.getTesterRanks(value[0], value[1]))
      )
      .subscribe(p => {
        this.page = p;
        this.changeDetector.markForCheck();
      });

    this.getTesterRanks(this.pageable, this.searchCriteria).subscribe(
      p => (this.page = p)
    );
  }

  ngOnDestroy() {
    this.testerRankThrottler.unsubscribe();
  }

  onPageChanged(event: PageEvent) {
    this.pageable = new Pageable(event.pageSize, event.pageIndex);
    this.reloadTesterRanks();
  }

  onSearchCriteriaChanged(searchCriteria: TesterRankSearchCriteria) {
    this.searchCriteria = searchCriteria;
    this.reloadTesterRanks();
  }

  private reloadTesterRanks() {
    this.testerRankThrottler.next([this.pageable, this.searchCriteria]);
  }

  private getTesterRanks(
    pagable: Pageable,
    searchCriteria: TesterRankSearchCriteria
  ): Observable<Page<TesterRank>> {
    return this.testerRankService
      .getPage(pagable, searchCriteria)
      .pipe(finalize(() => this.loadingData.next(false)));
  }
}
