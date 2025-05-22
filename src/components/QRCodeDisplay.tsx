import React from 'react';
import QRCode from 'qrcode.react';
import { Download } from 'lucide-react';

interface QRCodeDisplayProps {
  data: string;
  onDownloadQR: () => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ data, onDownloadQR }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-4 rounded-lg shadow-md relative">
        <QRCode 
          value={data} 
          size={250} 
          level="H"
          className="mx-auto"
          renderAs="canvas"
          includeMargin={true}
        />
      </div>
      <button
        onClick={onDownloadQR}
        className="mt-4 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
      >
        <Download size={18} />
        Download QR Code
      </button>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Scan this QR code and enter the correct password to decrypt the data
      </p>
    </div>
  );
};

export default QRCodeDisplay;