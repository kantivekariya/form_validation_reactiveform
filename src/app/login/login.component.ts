import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['' ,[Validators.required, Validators.minLength(6)]]
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  onLogin(){
    var data = JSON.parse(localStorage.getItem('Register'))
    if(data.email === this.loginForm.value.email && data.password === this.loginForm.value.password){
      console.log('working Fine');
    }else{
      alert('Password invalid');
    }
  }

}
