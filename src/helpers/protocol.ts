/**
 * Listen for Protocol open (i.e. Sauropod should open a otpauth:// URL)
 */
import { ipcRenderer } from 'electron';
import debugging from 'debug';

const debug = debugging('sauropod:protocol');

ipcRenderer.on('add-url', (event, url) => {
  debug('Open URL');
  window.location.hash = `#/fromUrl/${encodeURIComponent(url)}`;
});
ipcRenderer.on('reloadData', () => {
  debug('Reloading Data from storage');
  window.sauropod.services.persistence?.loadData();
});