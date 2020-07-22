import isDev from 'electron-is-dev';
import { remote } from 'electron';
import path from 'path';
import iconList from '../data/icons.json';

const { app } = remote;

export const getIcons = () => {
  return iconList;
};

export const findIconFor = (name : string) => {
  const n = name.toLowerCase();

  if (getIcons().includes(`/icons/color-${n}.svg`)) {
    return `/icons/color-${n}.svg`;
  } 
  return `/icons/0_unknown.svg`;
}

export const getIconPath = (name : string) => {
  // Rest if the icon is a Web URL as we don't need to prefix them
  if (!/^icons\/.*/.test(name)) {
    return name;
  }

  if (isDev) {
    // We can simply use the relative icon path in development
    return name;
  } else {
    // We need to use the absolute path to the unpacked ASAR assets
    return path.join(app.getAppPath(), 'build', name).replace('app.asar', 'app.asar.unpacked')
  }
}