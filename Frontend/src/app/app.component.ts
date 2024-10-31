import { Component } from '@angular/core';
import { CustomerListComponent } from './customer/components/customer-list.component';
import { CustomerFormComponent } from './customer/components/customer-form.component';
import { CommonModule } from '@angular/common';
import { Customer } from './customer/models/customer.model';
import { CustomerService } from './customer/services/customer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CustomerListComponent, CustomerFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  showForm: boolean = false;
  errorMessage: string | null = null;


  currentPage: number = 1;
  pageSize: number = 10;
  totalCustomers: number = 0;

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.loadCustomers();
  }


loadCustomers() {
  this.customerService.getCustomers(this.currentPage, this.pageSize).subscribe(
    (response: { customers: Customer[]; total: number }) => {
      console.log('API response:', response); 
      
      if (response && response.customers && typeof response.total === 'number') {
        this.customers = response.customers;
        this.totalCustomers = response.total;
        console.log('Loaded customers:', this.customers);
        this.errorMessage = null;
      } else {
        console.warn('Unexpected API response format:', response);
        this.errorMessage = 'Unexpected data format received from server.';
      }
    },
    (error) => {
      console.error('API error:', error); 
      this.errorMessage = 'Error loading customers. Please try again later.';
    }
  );
}

  

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.selectedCustomer = null; 
    }
  }

  onSelectCustomer(customer: Customer) {
    this.selectedCustomer = customer;
    this.showForm = true; 
  }

  onFormSubmitted(customerData: Customer) {
    if (customerData.id) {
      this.customerService.updateCustomer(customerData).subscribe(
        () => {
          this.loadCustomers();
          this.resetForm();
        },
        (error) => {
          this.errorMessage = 'Error updating customer. Please try again.';
        }
      );
    } else {
      this.customerService.addCustomer(customerData).subscribe(
        () => {
          this.loadCustomers();
          this.resetForm();
        },
        (error) => {
          this.errorMessage = 'Error adding customer. Please try again.';
        }
      );
    }
  }

  deleteCustomer(customerId: number) {
    this.customerService.deleteCustomer(customerId).subscribe(
      () => {
        this.loadCustomers();
      },
      (error) => {
        this.errorMessage = 'Error deleting customer. Please try again.';
      }
    );
  }

  resetForm() {
    this.selectedCustomer = null;
    this.showForm = false;
    this.errorMessage = null;
  }


  nextPage() {
    if (this.currentPage * this.pageSize < this.totalCustomers) {
      this.currentPage++;
      this.loadCustomers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCustomers();
    }
  }
}
