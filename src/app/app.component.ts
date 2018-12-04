import {Observable, Subject, timer} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public source = timer(1000, 1000);
  public destroy = new Subject<void>();

  ngOnInit(): void {
    this.source = Observable.create(() => {
      let previous_first = 0;
      let previous_second = 1;
      let next = 1;
      setInterval(() => {
        next = previous_first + previous_second;
        previous_first = previous_second;
        previous_second = next;
        console.log(next);
      }, 1000);
    });
  }

  startTimer() {
    this.source.subscribe(val => {
      console.log(val);
    }, takeUntil(this.destroy));
  }

  stopTimer() {
    this.destroy.next();
  }
}
