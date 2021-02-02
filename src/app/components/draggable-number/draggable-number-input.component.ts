import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'app-draggable-number-input',
  templateUrl: './draggable-number-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableNumberInputComponent {
  @Input() value: number
  @Output() valueChange = new EventEmitter<number>()
  @Input() step = 1
  @Input() frequency = 10
  @Input() min?: number
  @Input() max?: number
  @Input() prefixText?: string
  @Input() prefixIcon?: string
  @Input() prefixSvgIcon?: string
  @Input() suffixText?: string
  @Input() suffixIcon?: string
  @Input() suffixSvgIcon?: string
  @Input() placeholder?: string

  private _blur: boolean
  @Input()
  get blur() { return this._blur }
  set blur(value: any) { this._blur = coerceBooleanProperty(value) }
}
