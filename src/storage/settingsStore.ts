import { store } from '@risingstack/react-easy-state';

interface settingsStoreInterface {
  showTooltips: boolean,
  [key: string]: any,
};

const defaultState : settingsStoreInterface = {
  showTooltips: true,
};

const settingsStore = store(defaultState);

export default settingsStore;