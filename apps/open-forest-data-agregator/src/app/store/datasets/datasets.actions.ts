import { Action } from '@ngrx/store';

/**
 * Datasets action types
 */
export enum DatasetsActionTypes {
  CHANGE_VIEW_MODE = '[Datasets] Change datasets view mode'
}

/**
 * Store action for datasets
 */
export class DatasetsChangeViewMode implements Action {
  /**
   * Action type
   */
  readonly type = DatasetsActionTypes.CHANGE_VIEW_MODE;

  /**
   * Datasets change view mode constructor
   * @param {string} mode View mode
   */
  constructor(public mode: string) {}
}

/**
 * Export all datasets actions as one
 */
export type DatasetsActions = DatasetsChangeViewMode;
