import { HttpClient } from "@angular/common/http";
import { DataService } from "./../common/data.service";
import { Injectable } from "@angular/core";
import { Device } from "./device";

const resourcePath = "devices";

@Injectable()
export class DeviceService extends DataService<Device> {
  constructor(http: HttpClient) {
    super(resourcePath, http);
  }
}
