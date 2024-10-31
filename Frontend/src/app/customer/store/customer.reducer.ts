import { createReducer, on } from '@ngrx/store';
import * as CustomerActions from './customer.actions';
import { Customer } from '../models/customer.model';

export interface CustomerState {
  customers: Customer[];
}

export const initialState: CustomerState = {
  customers: []
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.loadCustomersSuccess, (state, { customers }) => ({ ...state, customers }))
);
