import { MatSnackBar } from "@angular/material/snack-bar";
import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error) {
    this.snackBar.open("An unexpected error occured.", "Dismiss");
  }
}
