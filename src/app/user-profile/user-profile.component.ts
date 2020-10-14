import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  LoginForm = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required]]
  });

  successmsg(){

debugger;

    if(this.LoginForm.value.Email=='demo@demo.com' && this.LoginForm.value.Password=='demo@123')
    {
      this.router.navigate(['/dashboard']);
    }

    else {
      alert("not working")
    }

  }

}
