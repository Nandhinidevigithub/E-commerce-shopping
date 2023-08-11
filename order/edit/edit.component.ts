// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-edit',
//   templateUrl: './edit.component.html',
//   styleUrls: ['./edit.component.css']
// })
// export class EditComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../iorder';
import { FormGroup, FormControl, Validators} from '@angular/forms';
      
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
       
  orderId!: number;
  order!:Order ;
  form!: FormGroup;
     
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public orderService: OrderService,
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
    this.orderId = this.route.snapshot.params['orderId'];

    this.orderService.find(this.orderId).subscribe((data: Order )=>{
      this.order = data;
    }); 
    this.form = new FormGroup({
     orderId: new FormControl('', [Validators.required]),
    customerId: new FormControl('', [Validators.required]),
     orderDate: new FormControl('', [Validators.required]),
     shipDate: new FormControl('', [Validators.required])
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
    this.orderService.update(this.orderId, this.order).subscribe((res:any) => {
         console.log('Order updated successfully!');
         this.router.navigateByUrl('order/index');
    })
  }
    
}
