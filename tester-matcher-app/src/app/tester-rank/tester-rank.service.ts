import { HttpClient } from "@angular/common/http";
import { DataService } from "./../common/data.service";
import { Injectable } from "@angular/core";
import { TesterRank } from "./model/tester-rank";

const resourcePath = "tester-ranks";

@Injectable()
export class TesterRankService extends DataService<TesterRank> {
  constructor(http: HttpClient) {
    super(resourcePath, http);
  }
}
