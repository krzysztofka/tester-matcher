import { MatSnackBar } from "@angular/material/snack-bar";
import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: any) {
    this.snackBar.open("An unexpected error occured.", "Dismiss");
  }
}
