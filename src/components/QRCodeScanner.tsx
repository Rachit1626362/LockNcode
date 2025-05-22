import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Scan, X } from 'lucide-react';

interface QRCodeScannerProps {
  onScan: (data: string) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = 'qr-reader';

  useEffect(() => {
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(error => {
          console.error('Error stopping scanner:', error);
        });
      }
    };
  }, []);

  const startScanner = () => {
    setIsScanning(true);
    setError(null);

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    };

    scannerRef.current = new Html5Qrcode(scannerContainerId);

    scannerRef.current.start(
      { facingMode: 'environment' },
      config,
      (decodedText) => {
        handleScan(decodedText);
      },
      (errorMessage) => {
        // QR code scanning errors are handled internally
      }
    ).catch((err) => {
      setError('Failed to start camera. Please ensure you have given camera permissions.');
      setIsScanning(false);
      console.error('Scanner error:', err);
    });
  };

  const stopScanner = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().then(() => {
        setIsScanning(false);
      }).catch(error => {
        console.error('Error stopping scanner:', error);
        setIsScanning(false);
      });
    }
  };

  const handleScan = (data: string) => {
    stopScanner();
    onScan(data);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {!isScanning ? (
        <button
          onClick={startScanner}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          <Scan size={18} />
          Scan QR Code
        </button>
      ) : (
        <div className="w-full max-w-sm">
          <div className="flex justify-end mb-2">
            <button
              onClick={stopScanner}
              className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full transition-colors duration-300"
            >
              <X size={16} />
            </button>
          </div>
          <div id={scannerContainerId} className="w-full h-64 rounded-lg overflow-hidden bg-gray-100"></div>
          <p className="text-sm text-center mt-2 text-gray-600">
            Position the QR code within the frame
          </p>
        </div>
      )}
      
      {error && (
        <div className="mt-4 text-center text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;