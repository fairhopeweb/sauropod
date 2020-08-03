import { store } from '@risingstack/react-easy-state';

export interface settingsStoreInterface {
  showTooltips: boolean,
  showSuggestions: boolean,
  autoLaunch: boolean,
  [key: string]: any,
};

const defaultState : settingsStoreInterface = {
  showTooltips: true,
  showSuggestions: false,
  autoLaunch: false,
};

const settingsStore = store(defaultState);

export default settingsStore;