import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-draggable-number',
  templateUrl: './draggable-number.component.html',
  styleUrls: ['./draggable-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableNumberComponent implements OnInit, OnDestroy, AfterViewInit {
  fakeCursor?: HTMLElement = undefined;
  x = 0;
  y = 0;

  mouseMoveLockEventRef = this.mouseMoveLockEvent.bind(this);
  mouseUpLockEventRef = this.mouseUpLockEvent.bind(this);
  pointerLockChangeEventRef = this.pointerLockChangeEvent.bind(this);

  @Input() ngModel: number;
  @Output() ngModelChange = new EventEmitter<number>();

  constructor(private ngZone: NgZone, private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.removeLock();
    this.clearEvents();
  }

  @HostListener('mousedown', ['$event']) onClick(ev: MouseEvent) {
    console.log(ev);
    if (!document.pointerLockElement) {
      document.documentElement.requestPointerLock();
      this.fakeCursor = document.createElement('div');
      this.fakeCursor.className = 'mat-icon material-icons mat-icon-no-color fake-cursor';
      this.fakeCursor.innerHTML = 'sync_alt';
      this.x = ev.clientX;
      this.y = ev.clientY;
      this.updateCursorPos();
      const body = document.getElementsByTagName('body')[0];
      body.appendChild(this.fakeCursor);
      body.style.pointerEvents = 'none';
      document.documentElement.style.userSelect = 'none';
      document.addEventListener('mousemove', this.mouseMoveLockEventRef);
      document.addEventListener('mouseup', this.mouseUpLockEventRef);
      document.addEventListener(
        'pointerlockchange',
        this.pointerLockChangeEventRef,
        false
      );
    }
  }

  clearEvents() {
    document.removeEventListener('mousemove', this.mouseMoveLockEventRef);
    document.removeEventListener('mouseup', this.mouseUpLockEventRef);
    document.removeEventListener('pointerlockchange', this.pointerLockChangeEventRef);
  }

  removeLock() {
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }

  mouseMoveLockEvent(ev: MouseEvent) {
    // this.ngZone.runOutsideAngular(() => {
      if (this.fakeCursor && document.pointerLockElement) {
        this.ngModel += ev.movementX;
        this.ngModelChange.emit(this.ngModel);
        // this.cd.markForCheck();
        this.x += ev.movementX;
        this.y += ev.movementY;
        this.x =
          (this.x +
            document.documentElement.getBoundingClientRect().width) %
          document.documentElement.getBoundingClientRect().width;
        this.y =
          (this.y +
            document.documentElement.getBoundingClientRect().height) %
          document.documentElement.getBoundingClientRect().height;
        this.updateCursorPos();
      }
    // });
  }

  mouseUpLockEvent(ev: MouseEvent) {
    this.removeLock();
  }

  pointerLockChangeEvent(ev: Event) {
    if (!document.pointerLockElement) {
      this.afterReleasePointerLock();
    }
  }

  ngAfterViewInit() {
  }

  afterReleasePointerLock() {
    this.clearEvents();
    if (this.fakeCursor) {
      this.fakeCursor.remove();
      this.fakeCursor = undefined;
      const body = document.getElementsByTagName('body')[0];
      document.documentElement.style.userSelect = 'auto';
      body.style.pointerEvents = 'auto';
    }
  }

  updateCursorPos() {
    if (!this.fakeCursor) {
      return;
    }
    this.fakeCursor.style.transform = `translate(${this.x}px, ${this.y}px)`;
    // this.fakeCursor.style.top = this.y.toString() + "px";
  }


}
