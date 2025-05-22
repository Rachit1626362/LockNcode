import React from 'react';
import { Download, Copy, Check, FileDown } from 'lucide-react';
import { saveFile } from '../utils/fileHandling';

interface ResultsDisplayProps {
  decryptedData: string;
  isFile: boolean;
  fileName?: string;
  fileType?: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  decryptedData, 
  isFile, 
  fileName = 'decrypted.txt', 
  fileType = 'text/plain' 
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(decryptedData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownloadClick = () => {
    saveFile(decryptedData, fileName, fileType);
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-700">
          {isFile ? 'Decrypted File' : 'Decrypted Text'}
        </h3>
        {isFile && fileName && (
          <p className="text-sm text-gray-500 mt-1">{fileName}</p>
        )}
      </div>

      {!isFile && (
        <div className="p-4">
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200 max-h-48 overflow-y-auto break-words">
            <pre className="text-sm whitespace-pre-wrap font-mono text-gray-700">{decryptedData}</pre>
          </div>
        </div>
      )}

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between">
        {!isFile && (
          <button 
            onClick={handleCopyClick}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-300"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
        
        <button 
          onClick={handleDownloadClick}
          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-300 ml-auto"
        >
          {isFile ? <FileDown size={16} /> : <Download size={16} />}
          {isFile ? 'Download File' : 'Download Text'}
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;