import { Component, OnInit } from "@angular/core";
import { Category } from "../shared/models/category.model";
import { CategoryService } from "../shared/services/category.service";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"]
})
export class CategoryListComponent implements OnInit {
  categories: Array<Category> = new Array<Category>();
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService
      .getAll()
      .subscribe(
        categories => (this.categories = categories),
        error => alert("Erro ao carrega a lista")
      );
  }

  deleteCategory(category: Category) {
    const mustDelete = confirm("Deseja realmente excluir este item?");
    if (mustDelete) {
      this.categoryService
        .delete(category.id)
        .subscribe(
          () =>
            (this.categories = this.categories.filter(
              element => element != category
            )),
          () => alert("Erro ao tentar excluir")
        );
    }
  }
}
