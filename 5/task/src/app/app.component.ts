import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task';

  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onIntervalEvent(emittedNumber: number) {
    if (emittedNumber % 2 === 0) {
      this.evenNumbers.push(emittedNumber);
    }
    else {
      this.oddNumbers.push(emittedNumber);
    }
  }
}
