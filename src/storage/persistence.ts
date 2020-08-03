/**
 * Persistence for react-easy-store storage
 */
import { autoEffect } from '@risingstack/react-easy-state';
import settings from 'electron-settings';
import debugging from 'debug';

import appStore, { appStoreInterface } from './appStore';
import settingsStore, { settingsStoreInterface } from './settingsStore';

const debug = debugging('sauropod:persistence');

interface storeStorage {
  appStore: appStoreInterface,
  settingsStore: settingsStoreInterface,
};

const setupPersistence = async () => {
  // Recover existing data from localStorage
  const loadData = async () => {
    // @ts-ignore
    const data : storeStorage | null = await settings.get('data');
    if (data) {
      debug('has loaded data', data);
      appStore.apps = data.appStore.apps;
      
      for (const key in data.settingsStore) {
        settingsStore[key] = data.settingsStore[key];
      }
    }
  };

  await loadData();

  const saveData = async () => {
    const data = {
      appStore,
      settingsStore,
    };

    debug('Saving data', data);
    await settings.set('data', data);
  }

  // Auto-save stores to localStorage
  autoEffect(saveData);

  window.sauropod.services.persistence = {
    saveData,
    loadData,
  };
}

export default setupPersistence;