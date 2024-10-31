import { createAction, props } from '@ngrx/store';
import { Customer } from '../models/customer.model';

export const loadCustomers = createAction(
  '[Customer] Load Customers',
  props<{ pageNumber: number; pageSize: number }>()
);

export const loadCustomersSuccess = createAction(
  '[Customer] Load Customers Success',
  props<{ customers: Customer[]; total: number }>()
);

export const loadCustomersFailure = createAction(
  '[Customer] Load Customers Failure',
  props<{ error: string }>()
);

export const addCustomer = createAction(
  '[Customer] Add Customer',
  props<{ customer: Customer }>()
);

export const updateCustomer = createAction(
  '[Customer] Update Customer',
  props<{ customer: Customer }>()
);

export const deleteCustomer = createAction(
  '[Customer] Delete Customer',
  props<{ customerId: number }>()
);
