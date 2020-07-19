/* eslint-disable no-restricted-globals */
/**
 * Utility for creating a screenshot of the current screen
 */

import {remote, desktopCapturer} from "electron";
import {
  hasScreenCapturePermission,
  hasPromptedForPermission,
} from 'mac-screen-capture-permissions';
import notify from './noty';

const { Menu } = remote;

let { platform } : any = process;
if (process.env.OS_PLATFORM) {
  platform = process.env.OS_PLATFORM;
}
export const isMac = platform === 'darwin';

const getVideo = (source : Electron.DesktopCapturerSource) : Promise<HTMLVideoElement> => {
  return new Promise(async resolve => {
    const constraints : MediaStreamConstraints = {
      audio: false,
      video: {
        // @ts-ignore
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: source.id
        }
      }
    };
  
    // Create a Stream
    const stream = await navigator.mediaDevices
      .getUserMedia(constraints);
  
    // Preview the source in a video element
    const videoElement = document.createElement('video');
    videoElement.srcObject = stream;

    videoElement.onloadedmetadata = () => {
      videoElement.style.height = videoElement.videoHeight + 'px'; // videoHeight
      videoElement.style.width = videoElement.videoWidth + 'px'; // videoWidth

      videoElement.play();

      resolve(videoElement);
    };
  });
};

const askForScreen = () : Promise<Electron.DesktopCapturerSource> => {
  return new Promise(async (resolve) => {
    const inputSources = await desktopCapturer.getSources({
      types: ['window', 'screen']
    });
  
    const videoOptionsMenu = Menu.buildFromTemplate([
      {
        label: 'Where can I find the QR Code?',
        enabled: false,
      },
      ...inputSources.map(source => {
        return {
          label: source.name,
          click: () => resolve(source)
        };
      }),
    ]);
  
    videoOptionsMenu.popup();
  });
}

export const takeScreenshot = async () => {
  if (isMac) {
    // This will allow us to request screen capture permissions
    if (!hasPromptedForPermission()) {
      hasScreenCapturePermission();
    }
  }

  const source = await askForScreen();

  console.log('Got source', source);

  const video = await getVideo(source);
  console.log('Got video', video);

  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    notify('Could not capture your screen. Please try again later.');
    return false;
  }
  
  // Draw video on canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const image = ctx.createImageData(canvas.width, canvas.height);

  const test = document.createElement('img');
  test.src = canvas.toDataURL();
  document.body.appendChild(test);

  video.remove();

  return {
    image,
    width: video.videoWidth,
    height: video.videoHeight,
  };
};