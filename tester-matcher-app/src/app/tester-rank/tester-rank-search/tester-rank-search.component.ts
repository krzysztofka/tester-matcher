import { TesterRankSearchCriteria } from "./../model/tester-rank-search-criteria";
import { CountryService } from "./../../country/country-service";
import { DeviceService } from "./../../device/device-service";
import {
  EventEmitter,
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Device } from "./../../device/device";

@Component({
  selector: "tester-rank-search",
  templateUrl: "./tester-rank-search.component.html",
  styleUrls: ["./tester-rank-search.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TesterRankSearchComponent implements OnInit {
  @Output() searchCriteriaChanged = new EventEmitter<
    TesterRankSearchCriteria
  >();

  deviceControl = new FormControl("");
  countryControl = new FormControl("");
  devices: Device[] = [];
  countries: string[] = [];

  constructor(
    private deviceService: DeviceService,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    this.deviceService.getAll().subscribe(d => {
      this.devices = d;
    });
    this.countryService.getAll().subscribe(c => {
      this.countries = c;
    });
  }

  onSearchCriteriaChange() {
    const searchCriteria = new TesterRankSearchCriteria(
      this.countryControl.value,
      this.deviceControl.value
    );
    this.searchCriteriaChanged.emit(searchCriteria);
  }

  deviceValueFn = (d: Device) => d.id.toString();
  deviceLabelFn = (d: Device) => d.description;
}
