import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ofd-agregator-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form = {
    username: '',
    password: '',
    remember_me: false
  };

  constructor() {}

  ngOnInit() {}

  onSubmit() {}
}
