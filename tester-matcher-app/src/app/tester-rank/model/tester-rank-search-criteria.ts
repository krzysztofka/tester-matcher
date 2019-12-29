import { SearchCriteria } from "./../../common/search-criteria";

export class TesterRankSearchCriteria implements SearchCriteria {
  constructor(
    public countryCodes: string[] = [],
    public deviceIds: string[] = []
  ) {}

  forEach(fn: (paramName: string, paramValue: string[]) => void) {
    Object.keys(this)
      .filter(key => this[key])
      .forEach(key => fn(key, this[key]));
  }
}
