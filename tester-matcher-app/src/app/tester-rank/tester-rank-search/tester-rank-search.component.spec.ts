import { MultiSelectAllComponent } from "./../../common/multi-select-all/multi-select-all.component";
import { environment } from "./../../../environments/environment";
import { TesterRankSearchCriteria } from "./../model/tester-rank-search-criteria";
import { TesterRankModule } from "./../tester-rank.module";
import { CountryService } from "./../../country/country-service";
import { DeviceService } from "./../../device/device-service";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TesterRankSearchComponent } from "./tester-rank-search.component";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Device } from "src/app/device/device";
import { By } from "@angular/platform-browser";

describe("TesterRankSearchComponent", () => {
  let httpMock: HttpTestingController;
  let component: TesterRankSearchComponent;
  let fixture: ComponentFixture<TesterRankSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [DeviceService, CountryService],
      imports: [TesterRankModule, HttpClientTestingModule, NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterRankSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.get(HttpTestingController);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should init with devices", () => {
    const devices = [new Device(1, "desc1"), new Device(2, "desc2")];

    httpMock.expectOne(`${environment.urlAddress}/devices`).flush(devices);

    expect(component.devices).toEqual(devices);
  });

  it("should init with countries", () => {
    const countries = ["US", "JP"];

    httpMock.expectOne(`${environment.urlAddress}/countries`).flush(countries);

    expect(component.countries).toEqual(countries);
  });

  it("should emit change search criteria event with values from controls", () => {
    const countryCodes = ["US", "JP"];
    const deviceIds = ["1", "2"];
    spyOn(component.searchCriteriaChanged, "emit");

    component.deviceControl.setValue(deviceIds);
    component.countryControl.setValue(countryCodes);

    const input = fixture.debugElement.query(
      By.directive(MultiSelectAllComponent)
    );
    input.triggerEventHandler("selectionChange", {});

    expect(component.searchCriteriaChanged.emit).toHaveBeenCalledWith(
      new TesterRankSearchCriteria(countryCodes, deviceIds)
    );
  });
});
