import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn  } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  checkboxForm: FormGroup;
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


  constructor(private fb: FormBuilder) {
    this.checkboxForm = this.fb.group({
      orders: new FormArray([], this.minSelectedCheckboxes(5))
    });
    

    this.addCheckbox();
  }


  ngOnInit() {

  }

  private addCheckbox() {
    this.orders.map((o, i) => {
      const control = new FormControl();
      (this.checkboxForm.controls.orders as FormArray).push(control);
    });
  }



  async onSubmit() {
    console.log(this.checkboxForm.value)
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
