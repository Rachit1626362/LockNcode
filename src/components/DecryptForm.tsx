import React, { useState, ChangeEvent } from 'react';
import { Unlock, AlertCircle, Scan, Upload } from 'lucide-react';
import { decryptData } from '../utils/encryption';
import QRCodeScanner from './QRCodeScanner';
import { Html5Qrcode } from 'html5-qrcode';

interface DecryptFormProps {
  onDecrypt: (decryptedData: string) => void;
  setError: (error: string | null) => void;
}

const DecryptForm: React.FC<DecryptFormProps> = ({ onDecrypt, setError }) => {
  const [encryptedText, setEncryptedText] = useState('');
  const [password, setPassword] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleEncryptedTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEncryptedText(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleQRScan = (data: string) => {
    setEncryptedText(data);
    setShowScanner(false);
  };

  const handleQRImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    try {
      const html5QrCode = new Html5Qrcode("qr-reader-upload");
      const imageFile = file;
      
      try {
        const decodedText = await html5QrCode.scanFile(imageFile, true);
        setEncryptedText(decodedText);
        setError(null);
      } catch (error) {
        setError('Could not detect QR code in the image. Please try a different image or enter the encrypted text manually.');
      }
    } catch (error) {
      setError('Failed to process the QR code image');
    }
  };

  const validateForm = (): boolean => {
    setValidationError(null);
    setError(null);
    
    if (encryptedText.trim() === '') {
      setValidationError('Please enter encrypted text');
      return false;
    }
    
    if (password.trim() === '') {
      setValidationError('Please enter the decryption password');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const decryptedText = decryptData(encryptedText, password);
      onDecrypt(decryptedText);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred during decryption');
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      {showScanner ? (
        <div className="mb-6">
          <QRCodeScanner onScan={handleQRScan} />
          <button
            onClick={() => setShowScanner(false)}
            className="mt-4 w-full text-center text-indigo-600 hover:text-indigo-800 text-sm"
          >
            Cancel and go back to manual input
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setShowScanner(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-2 px-4 rounded-md transition-colors duration-300"
            >
              <Scan size={18} />
              <span>Scan QR</span>
            </button>
            <label className="flex-1 flex items-center justify-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-2 px-4 rounded-md transition-colors duration-300 cursor-pointer">
              <Upload size={18} />
              <span>Upload QR</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleQRImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div id="qr-reader-upload" style={{ display: 'none' }}></div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="encryptedText" className="block text-sm font-medium text-gray-700 mb-1">
                  Encrypted Text
                </label>
                <textarea
                  id="encryptedText"
                  value={encryptedText}
                  onChange={handleEncryptedTextChange}
                  rows={5}
                  placeholder="Enter encrypted text or scan/upload a QR code..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter the decryption password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {validationError && (
                <div className="flex items-start gap-2 text-red-500 text-sm">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>{validationError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
              >
                <Unlock size={18} />
                <span>Decrypt</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DecryptForm;