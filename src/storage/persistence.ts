/**
 * Persistence for react-easy-store storage
 */
import { autoEffect } from '@risingstack/react-easy-state';

import appStore from './appStore';
import settingsStore from './settingsStore';

const setupPersistence = () => {
  // Recover existing data from localStorage
  if (localStorage.store) {
    const data = JSON.parse(localStorage.store);
    
    appStore.apps = data.appStore.apps;
    
    for (const key in data.settingsStore) {
      settingsStore[key] = data.settingsStore[key];
    }
  }

  // Auto-save stores to localStorage
  autoEffect(() => {
    const data = {
      appStore,
      settingsStore,
    };

    localStorage.store = JSON.stringify(data);
  });
}

export default setupPersistence;