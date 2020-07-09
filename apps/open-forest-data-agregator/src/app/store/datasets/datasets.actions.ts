import { Action } from '@ngrx/store';

export enum DatasetsActionTypes {
  CHANGE_VIEW_MODE = '[Datasets] Change datasets view mode'
}

/**
 * Store action for datasets
 *
 * @export
 * @class DatasetsChangeViewMode
 * @implements {Action}
 */
export class DatasetsChangeViewMode implements Action {
  readonly type = DatasetsActionTypes.CHANGE_VIEW_MODE;

  constructor(public mode: string) {}
}

export type DatasetsActions = DatasetsChangeViewMode;
