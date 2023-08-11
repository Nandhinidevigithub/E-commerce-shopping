import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../icustomer';
import { FormGroup, FormControl, Validators} from '@angular/forms';
      
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
       
  customerId!: number;
  customer!: Customer;
  form!: FormGroup;
     
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public custService: CustomerService,
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
    this.customerId = this.route.snapshot.params['customerId'];

    this.custService.find(this.customerId).subscribe((data: Customer)=>{
      this.customer = data;
    }); 
    this.form = new FormGroup({
      customerId: new FormControl('', [Validators.required]),
      fullname: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      deliveryAddress: new FormControl('', Validators.required)
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
    this.custService.update(this.customerId, this.customer).subscribe((res:any) => {
         console.log('Product updated successfully!');
         this.router.navigateByUrl('customer/index');
    })
  }
    
}