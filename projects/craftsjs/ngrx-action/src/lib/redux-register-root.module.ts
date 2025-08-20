import { NgModule, Injector, Inject, Optional } from '@angular/core';
import { ReducerManager } from '@ngrx/store';
import { STORE_TOKEN } from './redux-tokens';
import { createReducer } from './factory';

/**
 * ReduxRegisterRootModule
 *
 * Provides root-level registration of reducer classes decorated with @Store.
 * Compatibility: Angular 18, NgRx reducers.
 * Ensure the host application imports `StoreModule.forRoot(...)` to provide ReducerManager when using this module.
 */
@NgModule()
export class ReduxRegisterRootModule {
    constructor(@Optional() @Inject(STORE_TOKEN) reducers: any, @Optional() reducerFactory: ReducerManager, parentInjector: Injector) {
        if (reducers) {
            // tslint:disable-next-line:forin
            for (const key in reducers) {
                const klass = reducers[key];
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const inst = parentInjector.get(klass, new klass(), { optional: false });
                reducerFactory.addReducer(key, createReducer(inst));
            }
        }
    }
}
