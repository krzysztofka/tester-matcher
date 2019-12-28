import { MultiSelectAllComponent } from "./../common/multi-select-all/multi-select-all.component";
import { CountryService } from "./../country/country-service";
import { DeviceService } from "./../device/device-service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from "@angular/material";
import { TesterRankComponent } from "./tester-rank.component";
import { TesterRankTableComponent } from "./tester-rank-table/tester-rank-table.component";
import { TesterRankSearchComponent } from "./tester-rank-search/tester-rank-search.component";
import { TesterRankService } from "./tester-rank.service";

@NgModule({
  declarations: [
    TesterRankComponent,
    TesterRankTableComponent,
    TesterRankSearchComponent,
    MultiSelectAllComponent
  ],
  providers: [TesterRankService, DeviceService, CountryService],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [TesterRankComponent]
})
export class TesterRankModule {}
