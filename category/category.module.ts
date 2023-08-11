import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryRoutingModule } from './category-routing.module';



@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
