/**
 * Listen for Protocol open (i.e. Sauropod should open a otpauth:// URL)
 */
import { ipcRenderer } from 'electron';

ipcRenderer.on('add-url', (event, url) => {
  console.log('Open URL');
  window.location.hash = `#/fromUrl/${encodeURIComponent(url)}`;
});