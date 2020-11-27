import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';

import { LastSearchesComponent } from './components/last-searches/last-searches.component';
import { LastSearchesTriggerDirective } from './directives/last-searches-trigger/last-searches-trigger.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    MatIconModule
  ],
  exports: [LastSearchesTriggerDirective],
  declarations: [LastSearchesComponent, LastSearchesTriggerDirective]
})
export class LastSearchesModule {}
