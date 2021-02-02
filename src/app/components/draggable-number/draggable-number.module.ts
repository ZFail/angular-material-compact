import {NgModule} from '@angular/core'
import {DraggableNumberComponent} from './draggable-number.component'
import {DraggableNumberInputComponent} from './draggable-number-input.component'
import {AppMaterialModule} from '../../app-material.module'
import {FormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'

@NgModule({
  declarations: [DraggableNumberComponent, DraggableNumberInputComponent],
  imports: [FormsModule, AppMaterialModule, CommonModule],
  exports: [DraggableNumberComponent, DraggableNumberInputComponent],
})
export class DraggableNumberModule {}
