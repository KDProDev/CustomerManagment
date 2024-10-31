import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {
  @Input() customer: Customer | null = null;
  @Output() formSubmitted = new EventEmitter<Customer>();
  customerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnChanges() {
    if (this.customer) {
      this.customerForm.patchValue(this.customer);
    }
  }

  onSubmit() {

    let customerData: Partial<Customer> = { ...this.customerForm.value };
  

    if (this.customer?.id) {
      customerData.id = this.customer.id;
      customerData.createdDate = this.customer.createdDate; 
    } else {

      customerData.createdDate = new Date().toISOString();
    }
  

    customerData.lastUpdatedDate = new Date().toISOString();
  

    this.formSubmitted.emit(customerData as Customer);
  }
  
}
