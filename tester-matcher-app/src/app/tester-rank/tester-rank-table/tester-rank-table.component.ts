import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { TesterRank } from "../model/tester-rank";

@Component({
  selector: "app-tester-rank-table",
  templateUrl: "./tester-rank-table.component.html",
  styleUrls: ["./tester-rank-table.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TesterRankTableComponent {
  @Input() dataSource: TesterRank[];
  @Input() rankStartFrom = 0;

  public displayedColumns = [
    "rank",
    "testerId",
    "firstName",
    "lastName",
    "country",
    "score"
  ];
}
