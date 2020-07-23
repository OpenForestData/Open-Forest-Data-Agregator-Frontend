import { Injectable } from '@angular/core';

/**
 * Modal Service
 */
@Injectable({ providedIn: 'root' })
export class UIModalService {
  /**
   * All registered modals
   */
  public modals: any[] = [];

  /**
   * All opened modals
   */
  public openedModals: any[] = [];

  public generatedId = Math.random();

  /**
   * Add new modal
   * @param {any} modal Modal
   */
  add(modal: any): void {
    this.modals.push(modal);
  }

  /**
   * Remove modal
   * @param {any} id Modal ID
   */
  remove(id: any): void {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  /**
   * Open modal
   * @param {any} id Modal ID
   */
  open(id: string): void {
    const modal: any = this.modals.filter(x => x && x.id === id)[0];
    if (modal) {
      this.openedModals = [...this.openedModals, modal];
      modal.open();
    }
  }

  /**
   * Close modal
   * @param {any} id Modal ID
   */
  close(id: string): void {
    const modal: any = this.modals.filter(x => x.id === id)[0];
    if (!modal) return;
    this.openedModals = this.openedModals.filter(x => x.id !== id);
    if (modal) {
      modal.close();
    }
  }

  /**
   * Check if modal is open
   * @param {string} id Modal ID
   * @returns {boolean}
   */
  isModalOpen(id: string): boolean {
    return this.openedModals.filter(x => x && x.id === id).length > 0;
  }

  /**
   * Check if one or more modals is opened
   *
   * @returns {boolean}
   */
  checkModalIsOpen(): boolean {
    return this.openedModals.length > 0;
  }
}
