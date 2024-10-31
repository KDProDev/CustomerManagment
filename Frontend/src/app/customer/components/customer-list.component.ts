import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent {
  
  @Input() customers: Customer[] = [];
  @Output() editCustomer = new EventEmitter<Customer>();
  @Output() deleteCustomer = new EventEmitter<number>();

  onEdit(customer: Customer) {
 
    this.editCustomer.emit(customer);
  }

  onDelete(customerId: number) {
 
    this.deleteCustomer.emit(customerId);
  }
}
