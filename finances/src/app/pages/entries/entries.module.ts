import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,
    IMaskModule,
    CalendarModule,
    SharedModule
  ]
})
export class EntriesModule { }

