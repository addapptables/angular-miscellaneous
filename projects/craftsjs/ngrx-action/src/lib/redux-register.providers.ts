import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, Injector, makeEnvironmentProviders, inject } from '@angular/core';
import { ReducerManager, combineReducers } from '@ngrx/store';
import { FEATURE_STORE_TOKEN, STORE_TOKEN } from './redux-tokens';
import { createReducer } from './factory';

/**
 * Standalone providers to register reducers without NgModules (Angular 15+).
 * These mirror ReduxRegisterModule.forRoot/forFeature.
 */

export function provideReduxRegisterRoot(reducers: Record<string, any>): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: STORE_TOKEN, useValue: reducers },
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useFactory: () => {
        const providedReducers = inject(STORE_TOKEN, { optional: true });
        const reducerManager = inject(ReducerManager, { optional: true });
        const injector = inject(Injector);

        return () => {
          if (!providedReducers || !reducerManager) return;

          // tslint:disable-next-line:forin
          for (const key in providedReducers) {
            const klass = providedReducers[key];
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const inst = injector.get(klass, new klass(), { optional: false });
            reducerManager.addReducer(key, createReducer(inst));
          }
        };
      }
    }
  ]);
}

export function provideReduxRegisterFeature(
  key: string | Record<string, any>,
  reducers?: Record<string, any>
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: FEATURE_STORE_TOKEN, useValue: { key, reducers }, multi: true },
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useFactory: () => {
        const featureReducers = inject(FEATURE_STORE_TOKEN, { optional: true });
        const reducerManager = inject(ReducerManager, { optional: true });
        const injector = inject(Injector);

        return () => {
          if (!featureReducers || !reducerManager) return;

          featureReducers.forEach((featureReducer: any) => {
            if (typeof featureReducer.key !== 'string') {
              featureReducer.reducers = featureReducer.key;
              featureReducer.key = undefined;
            }

            const mapped: Record<string, any> = {};
            // tslint:disable-next-line:forin
            for (const k in featureReducer.reducers) {
              const klass = featureReducer.reducers[k];
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              const inst = injector.get(klass, new klass(), { optional: false });
              mapped[k] = createReducer(inst);
            }

            if (featureReducer.key) {
              reducerManager.addFeature({
                reducers: mapped,
                reducerFactory: combineReducers as any,
                key: featureReducer.key
              });
            }
          });
        };
      }
    }
  ]);
}
