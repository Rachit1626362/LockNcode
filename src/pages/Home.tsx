import React, { useState } from 'react';
import { QrCode, Download } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EncryptForm from '../components/EncryptForm';
import DecryptForm from '../components/DecryptForm';
import QRCodeDisplay from '../components/QRCodeDisplay';
import ResultsDisplay from '../components/ResultsDisplay';
import AlertMessage from '../components/AlertMessage';
import { saveAs } from 'file-saver';

const Home: React.FC = () => {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [encryptedData, setEncryptedData] = useState<string | null>(null);
  const [decryptedData, setDecryptedData] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleModeChange = (newMode: 'encrypt' | 'decrypt') => {
    setMode(newMode);
    setEncryptedData(null);
    setDecryptedData(null);
    setShowQRCode(false);
    setError(null);
    setSuccess(null);
  };

  const handleEncrypt = (encrypted: string) => {
    setEncryptedData(encrypted);
    setShowQRCode(true);
    setError(null);
    setSuccess('Text encrypted successfully!');
  };

  const handleDecrypt = (decrypted: string) => {
    setDecryptedData(decrypted);
    setError(null);
    setSuccess('Text decrypted successfully!');
  };

  const handleDownloadQR = () => {
    if (!encryptedData) return;
    
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, 'encrypted-qr-code.png');
      }
    });
  };

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(null);

  const resetForm = () => {
    setEncryptedData(null);
    setDecryptedData(null);
    setShowQRCode(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <button
                onClick={() => handleModeChange('encrypt')}
                className={`px-6 py-3 text-sm md:text-base font-medium transition-colors duration-300 ${
                  mode === 'encrypt'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Encrypt
              </button>
              <button
                onClick={() => handleModeChange('decrypt')}
                className={`px-6 py-3 text-sm md:text-base font-medium transition-colors duration-300 ${
                  mode === 'decrypt'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Decrypt
              </button>
            </div>
          </div>

          {(error || success) && (
            <div className="mb-6">
              {error && (
                <AlertMessage 
                  message={error} 
                  type="error" 
                  onClose={clearError} 
                />
              )}
              {success && (
                <AlertMessage 
                  message={success} 
                  type="success" 
                  onClose={clearSuccess} 
                />
              )}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                {mode === 'encrypt' ? (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Encrypt Your Text
                    </h2>
                    <EncryptForm onEncrypt={handleEncrypt} setError={setError} />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Decrypt Your Text
                    </h2>
                    <DecryptForm onDecrypt={handleDecrypt} setError={setError} />
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center justify-center border-t pt-8 md:border-t-0 md:pt-0 md:border-l md:pl-8">
                {mode === 'encrypt' && encryptedData ? (
                  <div className="w-full">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                      Encryption Result
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">QR Code</h3>
                        <QRCodeDisplay 
                          data={encryptedData}
                          onDownloadQR={handleDownloadQR}
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Encrypted Text</h3>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 break-all overflow-auto max-h-48">
                          <code className="text-xs text-gray-800">{encryptedData}</code>
                        </div>
                        <button
                          onClick={() => {
                            const blob = new Blob([encryptedData], { type: 'text/plain' });
                            saveAs(blob, 'encrypted-text.txt');
                          }}
                          className="mt-2 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                          <Download size={16} />
                          Download Text
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={resetForm}
                      className="mt-6 text-center w-full text-indigo-600 hover:text-indigo-800"
                    >
                      Encrypt new text
                    </button>
                  </div>
                ) : mode === 'decrypt' && decryptedData ? (
                  <div className="w-full">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                      Decryption Result
                    </h2>
                    <ResultsDisplay
                      decryptedData={decryptedData}
                      isFile={false}
                    />
                    <div className="mt-6 text-center">
                      <button 
                        onClick={resetForm}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Decrypt something else
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <div className="mb-4 text-gray-400">
                      {mode === 'encrypt' ? (
                        <QrCode className="w-16 h-16 mx-auto" />
                      ) : (
                        <Download className="w-16 h-16 mx-auto" />
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      {mode === 'encrypt' 
                        ? 'Your encrypted text will appear here' 
                        : 'Your decrypted text will appear here'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {mode === 'encrypt'
                        ? 'Enter text and password to encrypt'
                        : 'Enter encrypted text or scan a QR code to decrypt'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
            <h2 className="text-lg font-semibold text-indigo-800 mb-3">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <div className="text-indigo-600 mb-2 font-medium">1. Enter Text</div>
                <p className="text-sm text-gray-600">
                  Enter your text and choose a strong password for encryption.
                </p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <div className="text-indigo-600 mb-2 font-medium">2. Generate QR Code</div>
                <p className="text-sm text-gray-600">
                  Your text is encrypted and a QR code is generated containing the encrypted data.
                </p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <div className="text-indigo-600 mb-2 font-medium">3. Decrypt Securely</div>
                <p className="text-sm text-gray-600">
                  Scan or upload the QR code and enter your password to decrypt the text.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;