import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output
} from '@angular/core'

@Component({
  selector: 'app-draggable-number',
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      cursor: ew-resize;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableNumberComponent implements OnDestroy {
  fakeCursor?: HTMLElement = undefined
  cursorX = 0
  cursorY = 0
  delta = 0
  startValue = 0
  mouseDown = false
  firstMove = false

  mouseMoveLockEventRef = this.mouseMoveLockEvent.bind(this)
  mouseUpLockEventRef = this.mouseUpLockEvent.bind(this)
  pointerLockChangeEventRef = this.pointerLockChangeEvent.bind(this)

  @Input() value: number
  @Output() valueChange = new EventEmitter<number>()
  @Input() step = 1
  @Input() frequency = 10
  @Input() min?: number
  @Input() max?: number

  constructor(private elRef: ElementRef) {
  }

  ngOnDestroy() {
    this.removeLock()
    this.clearEvents()
  }

  @HostListener('mousedown', ['$event']) onDown(ev: MouseEvent) {
    if (!document.pointerLockElement) {
      if (!this.elRef.nativeElement.contains(document.activeElement)) {
        ev.stopPropagation()
        ev.preventDefault()
        this.mouseDown = true
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
      }
    }
  }

  @HostListener('mouseup', ['$event']) onUp(ev: MouseEvent) {
    this.mouseDown = false
  }

  @HostListener('mousemove', ['$event']) onMove(ev: MouseEvent) {
    if (!document.pointerLockElement && this.mouseDown) {
      this.mouseDown = false
      this.delta = ev.movementX
      this.startValue = this.value
      this.firstMove = true
      document.documentElement.requestPointerLock()
      this.fakeCursor = document.createElement('div')
      this.fakeCursor.className = 'mat-icon material-icons mat-icon-no-color'
      this.fakeCursor.innerHTML = 'sync_alt'
      this.fakeCursor.style.position = 'fixed'
      this.fakeCursor.style.zIndex = '1000'
      this.fakeCursor.style.top = '-5px'
      this.fakeCursor.style.left = '-5px'
      this.cursorX = ev.clientX
      this.cursorY = ev.clientY
      this.updateCursorPos()
      const body = document.getElementsByTagName('body')[0]
      body.appendChild(this.fakeCursor)
      body.style.pointerEvents = 'none'
      document.documentElement.style.userSelect = 'none'
      setTimeout(() => {
        document.addEventListener('mousemove', this.mouseMoveLockEventRef)
        document.addEventListener('mouseup', this.mouseUpLockEventRef)
        document.addEventListener(
          'pointerlockchange',
          this.pointerLockChangeEventRef,
          false
        )
      }, 0)
    }
  }


  @HostListener('keydown', ['$event']) onInputEnterPressed($event: KeyboardEvent) {
    if (document.activeElement instanceof HTMLElement && this.elRef.nativeElement.contains(document.activeElement) && $event.key === 'Enter') {
      document.activeElement.blur()
    }
  }

  clearEvents() {
    document.removeEventListener('mousemove', this.mouseMoveLockEventRef)
    document.removeEventListener('mouseup', this.mouseUpLockEventRef)
    document.removeEventListener('pointerlockchange', this.pointerLockChangeEventRef)
  }

  removeLock() {
    if (document.pointerLockElement) {
      document.exitPointerLock()
    }
  }

  mouseMoveLockEvent(ev: MouseEvent) {
    if (this.fakeCursor && document.pointerLockElement) {
      if (this.firstMove) {
        this.firstMove = false
        return
      }
      this.onMouseMoved(ev.movementX)
      // console.log(ev.movementX, ev.movementY)
      this.cursorX += ev.movementX
      this.cursorY += ev.movementY
      this.cursorX =
        (this.cursorX +
          document.documentElement.getBoundingClientRect().width) %
        document.documentElement.getBoundingClientRect().width
      this.cursorY =
        (this.cursorY +
          document.documentElement.getBoundingClientRect().height) %
        document.documentElement.getBoundingClientRect().height
      this.updateCursorPos()
    }
  }

  onMouseMoved(delta: number) {
    this.delta += delta
    const inc = (this.delta / this.frequency) | 0
    this.value = this.startValue + inc * this.step
    const stepStrs = this.step.toString().split('.')
    const fractionDigits = stepStrs.length > 1 ? stepStrs[1].length : 0
    this.value = parseFloat(this.value.toFixed(fractionDigits))
    if (this.min !== undefined) {
      this.value = Math.max(this.value, this.min)
    }
    if (this.max !== undefined) {
      this.value = Math.min(this.value, this.max)
    }
    this.valueChange.emit(this.value)
  }

  mouseUpLockEvent(ev: MouseEvent) {
    this.removeLock()
  }

  pointerLockChangeEvent(ev: Event) {
    if (!document.pointerLockElement) {
      this.afterReleasePointerLock()
    }
  }

  afterReleasePointerLock() {
    this.clearEvents()
    if (this.fakeCursor) {
      this.fakeCursor.remove()
      this.fakeCursor = undefined
      const body = document.getElementsByTagName('body')[0]
      document.documentElement.style.userSelect = 'auto'
      body.style.pointerEvents = 'auto'
    }
  }


  updateCursorPos() {
    if (!this.fakeCursor) {
      return
    }
    this.fakeCursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`
  }
}
