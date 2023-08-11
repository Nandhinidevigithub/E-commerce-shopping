// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-index',
//   templateUrl: './index.component.html',
//   styleUrls: ['./index.component.css']
// })
// export class IndexComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../iorder';
       
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
       
  orders: Order[] = [];
     
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public orderService: OrderService) { }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.orderService.getAll().subscribe((data: Order[])=>{
      this.orders = data;
      console.log(this.orders);
    })  
  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePost(id:number){
    this.orderService.delete(id).subscribe(res => {
         this.orders= this.orders.filter(item => item.orderId !== id);
         console.log('Order deleted successfully!');
    })
  }
     
}
