import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
// import { Userdetails } from 'src/app/user/userdetails';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:[]
})
export class HomeComponent implements OnInit {
  userdetails:any;

  constructor(private router : Router,private service : UserService) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res => {
        this.userdetails = res;
      },
      err => {
        console.log(err);
      },
    );


  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
