// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-create',
//   templateUrl: './create.component.html',
//   styleUrls: ['./create.component.css']
// })
// export class CreateComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Order } from '../iorder';
      
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  orderObj!:Order;
     
  form!: FormGroup;
     
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public orderService: OrderService,
    private router: Router
  ) { }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      orderId: new FormControl('', [Validators.required]),
      customerId: new FormControl('', [Validators.required]),
      orderDate: new FormControl('', [Validators.required]),
      shipDate: new FormControl('', Validators.required)
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
    this.orderObj=this.form.value;
   
   
    this.orderService.create(this.form.value).subscribe((res:any) => {
         console.log('Order Added successfully!');
         this.router.navigateByUrl('order/index');
    })
  }
   
}
