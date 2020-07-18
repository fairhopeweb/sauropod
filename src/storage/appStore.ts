import { store } from '@risingstack/react-easy-state';

import * as Types from '../types';

interface appStoreInterface {
  apps: Types.AppArray,
};

const defaultState : appStoreInterface = {
  apps: [
    {
      name: "Twitter",
      description: 'John Doe',
      icon: '/icons/color-twitter.svg',
      token: 'HHPCZGQ3ZZLTRICKIPL36MO53ACFFJDJ',
    },
    {
      name: "Facebook",
      description: 'John Doe',
      icon: '/icons/color-facebook.svg',
      token: 'JDTZJ44CKUEF35VDBWO7BUPSUYE7QI6X',
    },
  ],
};

const appStore = store(defaultState);

export default appStore;