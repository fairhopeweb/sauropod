/**
 * Read a QR Code
 */
import jsQR from "jsqr";

interface QRReader {
  image: ImageData,
  width: number,
  height: number,
};

const readQr = ({ image, width, height } : QRReader) => {
  const code = jsQR(image.data, width, height);

  if (code) {
    return code.data;
  }
  return false;
}

export default readQr;