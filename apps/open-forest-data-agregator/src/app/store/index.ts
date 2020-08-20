import { ActionReducerMap } from '@ngrx/store';

import * as fromDatasets from './datasets/datasets.reducer';

/**
 * Application state interface
 */
export interface AppState {
  /**
   * Datasets state
   */
  datasets: fromDatasets.DatasetsState;
}

/**
 * Reducers
 */
export const reducers: ActionReducerMap<AppState> = {
  datasets: fromDatasets.datasetsReducer
};
