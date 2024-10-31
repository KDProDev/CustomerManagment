import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from '../services/customer.service';
import * as CustomerActions from './customer.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CustomerEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      mergeMap(action =>
        this.customerService.getCustomers(action.pageNumber, action.pageSize).pipe(
          map(response => CustomerActions.loadCustomersSuccess({ 
            customers: response.customers, 
            total: response.total 
          })),
          catchError(error => 
            of(CustomerActions.loadCustomersFailure({ error: error.message || 'Unknown error occurred' }))
          )
        )
      )
    )
  );
}
