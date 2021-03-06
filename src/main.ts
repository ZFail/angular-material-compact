import './polyfills';

import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app/app-material.module';

import {AppComponent} from './app/app-component';
import {ButtonsComponent} from './app/components/buttons/buttons';
import {AllComponent} from './app/components/all/all.component';
import {ChipsComponent} from './app/components/chips/chips.component';
import {ListComponent} from './app/components/list/list.component';
import {FormFieldComponent} from './app/components/form-field/form-field.component';
import {LayoutComponent} from './app/components/layout/layout.component';
import {DraggableNumberModule} from './app/components/draggable-number/draggable-number.module';

// Default MatFormField appearance to 'fill' as that is the new recommended approach and the
// `legacy` and `standard` appearances are scheduled for deprecation in version 10.
// This makes the examples that use MatFormField render the same in StackBlitz as on the docs site.
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppMaterialModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        DraggableNumberModule,
    ],
    entryComponents: [AppComponent],

    declarations: [
        AppComponent,
        ButtonsComponent,
        AllComponent,
        ChipsComponent,
        ListComponent,
        FormFieldComponent,
        LayoutComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));

/**  Copyright 2020 Google LLC. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license */
