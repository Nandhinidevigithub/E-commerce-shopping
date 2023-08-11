import { Component, OnInit } from '@angular/core';
import {CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Category } from '../icategory';
import { FormGroup, FormControl, Validators} from '@angular/forms';
      
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
       
  categoryId!: number;
  category!: Category;
  form!: FormGroup;
     
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) 
  { 
   
  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['categoryId'];

    this.categoryService.find(this.categoryId).subscribe((data: Category)=>{
      this.category = data;
    }); 
    this.form = new FormGroup({
      categoryId: new FormControl('', [Validators.required]),
      categoryName: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
       
    
  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.categoryService.update(this.categoryId, this.category).subscribe((res:any) => {
         console.log('Category updated successfully!');
         this.router.navigateByUrl('category/index');
    })
  }
    
}
