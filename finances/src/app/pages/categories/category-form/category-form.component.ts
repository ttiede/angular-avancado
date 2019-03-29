import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router  } from "@angular/router";
import { Category } from "../shared/model/category.model";
import { CategoryService } from "../shared/service/category.service";
import { switchMap  } from "rxjs/operators";
import toastr from "toastr";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  
  currentAction: string;
  categoriesForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: Array<string> = Array<string>();
  submittingForm: boolean =  false;
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

  private loadCategory() 
  {
    if(!this.isNewForm){
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id")))
      ).subscribe(
        (category) => {
          this.category = category;
          this.categoriesForm.patchValue(category)
        },
        (error) =>alert("Ocorreu um erro no servidor, tente mais tarde.") 
      )
    }
  }

  ngAfterContentChecked(): void {
    this.setPageTittle();
  }

  private setPageTittle(){
    this.pageTitle = 'Cadastro de nova Categoria';
    if(!this.isNewForm){
      const categoriName = this.category.name || "";
      this.pageTitle = "Editando Categoria: "+ categoriName;
    }
  }

  private buildCategoryForm(): any {
    this.categoriesForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private setCurrentAction() {
    this.currentAction = "new";
    if(this.route.snapshot.url[0].path == "edit"){
      this.currentAction = "edit";
      this.isNewForm = false
      }
    }
}

