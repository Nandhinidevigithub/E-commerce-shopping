import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from '../orderdetail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetail } from '../iorderdetail';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  orderNo!: number;
  OrderDetail!: OrderDetail;
  form!: FormGroup;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public OrddetService: OrderDetailService,
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
    this.orderNo = this.route.snapshot.params['orderNo'];

    this.OrddetService.find(this.orderNo).subscribe((data: OrderDetail)=>{
      this.OrderDetail = data;
    });
    this.form = new FormGroup({
      orderNo: new FormControl('', [Validators.required]),
      orderId: new FormControl('', [Validators.required]),
      productId: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      unitCost: new FormControl('', Validators.required)
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
    this.OrddetService.update(this.orderNo, this.OrderDetail).subscribe((res:any) => {
         console.log('OrderDetail updated successfully!');
         this.router.navigateByUrl('OrderDetail/index');
    })
  }

}
