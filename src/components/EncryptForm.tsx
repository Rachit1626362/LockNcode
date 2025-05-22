import React, { useState, ChangeEvent } from 'react';
import { Lock, AlertCircle } from 'lucide-react';
import { encryptData } from '../utils/encryption';

interface EncryptFormProps {
  onEncrypt: (encryptedData: string) => void;
  setError: (error: string | null) => void;
}

const EncryptForm: React.FC<EncryptFormProps> = ({ onEncrypt, setError }) => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const validateForm = (): boolean => {
    setValidationError(null);
    setError(null);
    
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return false;
    }
    
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }
    
    if (text.trim() === '') {
      setValidationError('Please enter text to encrypt');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const encryptedText = encryptData(text, password);
      onEncrypt(encryptedText);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred during encryption');
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
            Text to encrypt
          </label>
          <textarea
            id="text"
            value={text}
            onChange={handleTextChange}
            rows={5}
            placeholder="Enter text to encrypt..."
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
            placeholder="Enter a strong password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm your password"
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
          <Lock size={18} />
          <span>Encrypt</span>
        </button>
      </form>
    </div>
  );
};

export default EncryptForm;