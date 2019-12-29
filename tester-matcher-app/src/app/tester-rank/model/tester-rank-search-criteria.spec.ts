import { TesterRankSearchCriteria } from "./tester-rank-search-criteria";

describe("TesterRankSearchCriteria", () => {
  it("should interate through empty properties", () => {
    const testerRankSearchCriteria = new TesterRankSearchCriteria([], []);

    const result = {};
    testerRankSearchCriteria.forEach((k, v) => (result[k] = v));

    expect(result).toEqual({
      countryCodes: [],
      deviceIds: []
    });
  });

  it("should interate through filled properties", () => {
    let countries = ["US", "JP"];
    let devices = ["1", "2", "3"];

    const testerRankSearchCriteria = new TesterRankSearchCriteria(
      countries,
      devices
    );

    const result = {};
    testerRankSearchCriteria.forEach((k, v) => (result[k] = v));

    expect(result).toEqual({
      countryCodes: countries,
      deviceIds: devices
    });
  });
});
