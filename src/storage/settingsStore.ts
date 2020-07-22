import { store } from '@risingstack/react-easy-state';

interface settingsStoreInterface {
  showTooltips: boolean,
  showSuggestions: boolean,
  [key: string]: any,
};

const defaultState : settingsStoreInterface = {
  showTooltips: true,
  showSuggestions: false,
};

const settingsStore = store(defaultState);

export default settingsStore;