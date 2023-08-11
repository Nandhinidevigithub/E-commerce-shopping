import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../icategory';
     
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
      
 categoryId!: number;
 category!: Category;
     
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
     
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
  }
     
}

