import * as DatasetsActions from './datasets.actions';

export interface DatasetsState {
  mode: string;
}

const initialState: DatasetsState = {
  mode: 'list'
};

export function datasetsReducer(
  state: DatasetsState = initialState,
  action: DatasetsActions.DatasetsActions
): DatasetsState {
  switch (action.type) {
    case DatasetsActions.DatasetsActionTypes.CHANGE_VIEW_MODE: {
      return {
        ...state,
        mode: action.mode
      };
    }

    default:
      return state;
  }
}
