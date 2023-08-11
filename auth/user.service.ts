import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'http://localhost:5275/api';

  formModel = this.fb.group({
    Username: ['', Validators.required],
    Email: ['', Validators.email],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['']
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl?.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password')?.value != confirmPswrdCtrl?.value)
        confirmPswrdCtrl?.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl?.setErrors(null);
    }
  }

  register() {
    var body = {
      Username: this.formModel.value.Username,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password,
      ConfirmPassword:this.formModel.value.Passwords.ConfirmPassword
    };
    return this.http.post(this.BaseURI + '/Authenticate/register', body);
  }

  login(formData:any) {
    return this.http.post(this.BaseURI + '/Authenticate/login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }
 
}

