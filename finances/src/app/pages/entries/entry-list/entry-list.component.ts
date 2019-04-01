import { Component, OnInit } from "@angular/core";
import { Entry } from "../shared/models/entry.model";
import { EntryService } from "../shared/services/entry.service";
import { element } from "@angular/core/src/render3";

@Component({
  selector: "app-entry-list",
  templateUrl: "./entry-list.component.html",
  styleUrls: ["./entry-list.component.css"]
})
export class EntryListComponent implements OnInit {
  entries: Array<Entry> = new Array<Entry>();
  constructor(private entryService: EntryService) {}

  ngOnInit() {
    this.entryService
      .getAll()
      .subscribe(
        entries => (this.entries = entries.sort((a,b) => b.id - a.id)),
        error => alert("Erro ao carrega a lista")
      );
  }

  deleteEntry(entry: Entry) {
    const mustDelete = confirm("Deseja realmente excluir este item?");
    if (mustDelete) {
      this.entryService
        .delete(entry.id)
        .subscribe(
          () =>
            (this.entries = this.entries.filter(
              element => element != entry
            )),
          () => alert("Erro ao tentar excluir")
        );
    }
  }
}
