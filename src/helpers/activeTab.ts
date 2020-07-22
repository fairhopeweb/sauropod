/**
 * Communinicate with the system to get the current tab URL
 */
import { ipcRenderer } from 'electron';

const getCurrentTabName = () : Promise<string | false> => {
  return new Promise((resolve) => {
    ipcRenderer.once('currentUrl', (e, info) => {
      if (info && info.title) {
        resolve(info.title);
      } else {
        resolve(false);
      }
    });

    ipcRenderer.send('getCurrentUrl');
  });
}

export default getCurrentTabName;