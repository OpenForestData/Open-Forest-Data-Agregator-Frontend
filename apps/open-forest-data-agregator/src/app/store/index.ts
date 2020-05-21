import { ActionReducerMap } from '@ngrx/store';

import * as fromDatasets from './datasets/datasets.reducer';

export interface AppState {
  datasets: fromDatasets.DatasetsState;
}

export const reducers: ActionReducerMap<AppState> = {
  datasets: fromDatasets.datasetsReducer
};
