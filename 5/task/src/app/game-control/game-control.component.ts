import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  interval;
  @Output() intervalEvent = new EventEmitter<number>();
  count = 0;
  constructor() { }

  ngOnInit(): void {
  }

  onStartGame() {
    this.interval = setInterval(() => {
      this.intervalEvent.emit(++this.count);
    }, 1000);
  }

  onPauseGame() {
    clearInterval(this.interval);
  }

  onEndGame() {
    clearInterval(this.interval);
    this.count = 0;
  }

}
