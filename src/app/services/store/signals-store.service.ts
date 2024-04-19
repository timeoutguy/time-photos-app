import { Injectable, computed, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalsStoreService<T> {
  state = signal({} as T);

  constructor() {}

  /**
   * This is used to set a new value for a property
   *
   * @param key - the key of the property to be set
   * @param data - the new value of the property
   */
  public set<K extends keyof T>(key: K, data: T[K]) {
    this.state.update((currentValue) => ({ ...currentValue, [key]: data }));
  }

  /**
   *  Sets values for multiple properties on the store
   * This is used when tere is a need to update multiple properties at once
   *
   * @param partialState - the new values of the properties
   */
  public setState(partialState: Partial<T>): void {
    this.state.update((currentValue) => ({ ...currentValue, ...partialState }));
  }

  /**
   * This is used to get the value of a property
   *
   * @param key - the key of the property to be retrieved
   */
  public select<K extends keyof T>(key:K) {
    return computed(() => this.state()[key]);
  }

  public clear() {
    this.state.update(() => ({} as T));
  }
}
