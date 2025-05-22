import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface AlertMessageProps {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, type, onClose }) => {
  const bgColor = type === 'error' ? 'bg-red-50' : 'bg-green-50';
  const borderColor = type === 'error' ? 'border-red-200' : 'border-green-200';
  const textColor = type === 'error' ? 'text-red-700' : 'text-green-700';
  const Icon = type === 'error' ? AlertCircle : CheckCircle;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose, message]);

  return (
    <div className={`p-4 rounded-md border ${borderColor} ${bgColor} flex items-start justify-between animate-fadeIn`}>
      <div className="flex items-start">
        <Icon className={`h-5 w-5 ${textColor} mr-3 flex-shrink-0 mt-0.5`} />
        <span className={`text-sm ${textColor}`}>{message}</span>
      </div>
      <button 
        onClick={onClose}
        className="ml-4 inline-flex text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default AlertMessage;