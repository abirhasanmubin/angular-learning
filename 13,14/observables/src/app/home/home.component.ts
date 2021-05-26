import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private obs: Subscription;

  constructor() { }

  ngOnInit() {
    // this.obs = interval(1000).subscribe((count => {
    //   console.log(count);
    // }))
    const customInterval = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count++);
        if (count > 4) {
          observer.error(new Error('Count is greater than 4'));
        }
        if (count > 3) {
          observer.complete();
        }
      }, 1000);
    })
    this.obs = customInterval.subscribe((data) => {
      console.log(data);
    }, error => {
      alert(error.message);
    }, () => {
      console.log("completed");
    })
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }

}
