// TODO: refactor tester rank component and use data source instead

import { map, finalize } from "rxjs/operators";
import { Page } from "./../common/page";
import { TesterRankSearchCriteria } from "./model/tester-rank-search-criteria";
import { TesterRankService } from "./tester-rank.service";
import { DataSource } from "@angular/cdk/table";
import { TesterRank } from "./model/tester-rank";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Pageable } from "../common/page";
import { CollectionViewer } from "@angular/cdk/collections";

export class TesterRankDataSource implements DataSource<TesterRank> {
  private testerRankSubject = new BehaviorSubject<Page<TesterRank>>(new Page());
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private testerRanksSubscription: Subscription;

  public loading$ = this.loadingSubject.asObservable();

  constructor(private testerRankService: TesterRankService) {}

  connect(collectionViewer: CollectionViewer): Observable<TesterRank[]> {
    return this.testerRankSubject
      .asObservable()
      .pipe(map(page => page.content));
  }

  get page$() {
    return this.testerRankSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.testerRankSubject.complete();
    this.loadingSubject.complete();
  }

  fetchPage(pageable: Pageable, searchCriteria: TesterRankSearchCriteria) {
    this.loadingSubject.next(true);
    if (this.testerRanksSubscription) {
      this.testerRanksSubscription.unsubscribe();
    }
    this.testerRankService
      .getPage(pageable, searchCriteria)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(page => this.testerRankSubject.next(page));
  }
}
