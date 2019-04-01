import { Component, OnInit, AfterContentChecked } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "../shared/models/category.model";
import { CategoryService } from "../shared/services/category.service";
import { switchMap } from "rxjs/operators";
import toastr from "toastr";

@Component({
  selector: "app-category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.css"]
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: Array<string>;
  submittingForm: boolean = false;
  category: Category = new Category();
  isNewForm: boolean = true;
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTittle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.isNewForm)
      this.createCategory();
    else
      this.updateCategory();
  }

  private updateCategory(): any {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.update(category).subscribe(
      (category) => this.actionsForSucesses(category),
      (error) => this.actionsForError(error)
    );
  }

  private createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.create(category).subscribe(
      (category) => this.actionsForSucesses(category),
      (error) => this.actionsForError(error)
    );
  }

  private actionsForError(error: any): void {
    toastr.error("Ocorreu um erro ao processar a sua solicitação");

    this.submittingForm = false;
    if (error.status == 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."];
  }
  private actionsForSucesses(category: Category): void {
    toastr.success("Solicitação processada com sucesso");
    this.router.navigateByUrl("categories", { skipLocationChange: true });
    this.router.navigateByUrl("categories", { skipLocationChange: true }).then(
      () => this.router.navigate(["categories", category.id, "edit"])
    );
  }

  private loadCategory() {
    if (!this.isNewForm) {
      this.route.paramMap
        .pipe(
          switchMap(params => this.categoryService.getById(+params.get("id")))
        )
        .subscribe(
          category => {
            this.category = category;
            this.categoryForm.patchValue(category);
          },
          error => alert("Ocorreu um erro no servidor, tente mais tarde.")
        );
    }
  }

  private setPageTittle() {
    if (this.isNewForm)
      this.pageTitle = "Cadastro de nova Categoria";
    if (!this.isNewForm) {
      const categoryName = this.category.name || "";
      this.pageTitle = "Editando Categoria: " + categoryName;
    }
  }

  private buildCategoryForm(): any {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new";
    }
    else {
      this.currentAction = "edit";
      this.isNewForm = false;
    }
  }
}
