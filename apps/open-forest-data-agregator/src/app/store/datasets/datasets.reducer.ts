import * as DatasetsActions from './datasets.actions';

/**
 * Datasets state interface
 *
 * @export
 * @interface DatasetsState
 */
export interface DatasetsState {
  /**
   * Datasets view mode
   */
  mode: string;
}

/**
 * Datasets initial state
 */
const initialState: DatasetsState = {
  mode: 'list'
};

/**
 * Store reducer for datasets states
 *
 * @export
 * @param {DatasetsState} [state=initialState]
 * @param {DatasetsActions} action
 * @returns {DatasetsState}
 */
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
