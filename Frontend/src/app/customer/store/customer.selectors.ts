import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer.reducer';

export const selectCustomerState = createFeatureSelector<CustomerState>('customers');
export const selectAllCustomers = createSelector(selectCustomerState, (state) => state.customers);
