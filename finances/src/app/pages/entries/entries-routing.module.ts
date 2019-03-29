import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryListComponent } from './entry-list/entry-list.component';

const routes: Routes = [
  { path: '', component: EntryListComponent },
  // { path: 'new', component: EntryListFormComponent },
  // { path: ':id/edit', component: EntryListFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
