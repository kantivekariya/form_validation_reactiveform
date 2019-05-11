import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, FormControl } from '@angular/forms';
import { MustMatch } from '../register/MustMatch.module';
import { Router } from '@angular/router';
import { _fixedSizeVirtualScrollStrategyFactory } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFrom: FormGroup;
  orders = [
    { id: 1, name: 'order 1', value: 3000 },
    { id: 2, name: 'order 2', value: 5000 },
    { id: 3, name: 'order 3', value: 6000 },
    { id: 4, name: 'order 4', value: 1100 },
    { id: 5, name: 'order 5', value: 1200 },
    { id: 6, name: 'order 6', value: 1300 },
    { id: 7, name: 'order 7', value: 1400 },
    { id: 8, name: 'order 8', value: 1500 },
    { id: 9, name: 'order 9', value: 1600 },
    { id: 10, name: 'order 10', value: 1700 }];

  constructor(private formBuilder: FormBuilder,public _router: Router) { }

  ngOnInit() {
    this.registerFrom = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      orders: new FormArray([], this.minSelectedCheckboxes(5))
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });

      this.addCheckbox();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerFrom.controls[controlName].hasError(errorName);
  }

  async OnRegister(){
    console.log(this.registerFrom.value.orders)

    // localStorage.setItem('Register',JSON.stringify(this.registerFrom.value))
    // alert("Register Succesfully");
    // this._router.navigate(['login']);
  } 

  private addCheckbox() {
    this.orders.map((o, i) => {
      const control = new FormControl();
      (this.registerFrom.controls.orders as FormArray).push(control);
    });
  }

  minSelectedCheckboxes(min = 5) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
     
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);
        
      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
      
    };
  
    return validator;
  }

  
}
