import {Subject} from 'rxjs';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public subject = new Subject<number>();

  fibonacci(number) {

    let previous_first = 0, previous_second = 1, next = 1;

    for(let i = 2; i <= number; i++) {
      next = previous_first + previous_second;
      previous_first = previous_second;
      previous_second = next;
      this.subject.next(next);
    }
    return next;
  };

  ngOnInit(): void {
    this.subject.subscribe(num => {
      console.log(num);
    });
    this.fibonacci(10);
  }
}
