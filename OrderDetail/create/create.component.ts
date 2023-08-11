import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from '../orderdetail.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public OrddetService: OrderDetailService,
    private router: Router
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
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
    this.OrddetService.create(this.form.value).subscribe((res:any) => {
         console.log('OrderDetail Added successfully!');
         this.router.navigateByUrl('OrderDetail/index');
    })
  }

}
