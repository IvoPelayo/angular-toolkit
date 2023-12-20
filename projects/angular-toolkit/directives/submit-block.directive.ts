import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[submitBlock]'
})
export class SubmitButtonBlockDirective implements OnInit, OnDestroy {
  @Input()
  blockedTime = 500;

  @Output()
  singleClick = new EventEmitter();

  private clicks = new Subject<Event>();
  private subscription?: Subscription;

  ngOnInit() {
    this.subscription = this.clicks.pipe(
      throttleTime(this.blockedTime)
    ).subscribe(e => this.emitThrottledClick(e));
  }

  emitThrottledClick(e: Event) {
    this.singleClick.emit(e);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
