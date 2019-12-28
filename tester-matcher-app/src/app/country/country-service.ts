import { HttpClient } from "@angular/common/http";
import { DataService } from "./../common/data.service";
import { Injectable } from "@angular/core";

const resourcePath = "countries";

@Injectable()
export class CountryService extends DataService<string> {
  constructor(http: HttpClient) {
    super(resourcePath, http);
  }
}
