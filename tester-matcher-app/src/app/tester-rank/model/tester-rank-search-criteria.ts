import { SearchCriteria } from "./../../common/search-criteria";

export class TesterRankSearchCriteria implements SearchCriteria {
  constructor(
    public countryCodes: string[] = [],
    public deviceIds: string[] = []
  ) {}

  toParamsMap(): Map<string, string[]> {
    const result = new Map<string, string[]>();
    Object.keys(this)
      .filter(key => this[key])
      .forEach(key => result.set(key, this[key]));
    return result;
  }
}
