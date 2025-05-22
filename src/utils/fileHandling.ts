import { saveAs } from 'file-saver';
import { isValidJSON } from './encryption';

/**
 * Reads a file and returns its contents as text
 * @param file The file to read
 * @returns A promise that resolves with the file contents as text
 */
export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('File reading error'));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Reads a file and returns its contents as a data URL
 * @param file The file to read
 * @returns A promise that resolves with the file contents as a data URL
 */
export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('File reading error'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Saves data as a file
 * @param data The data to save
 * @param fileName The name of the file
 * @param fileType The MIME type of the file
 */
export const saveFile = (data: string, fileName: string, fileType: string = 'text/plain;charset=utf-8'): void => {
  try {
    const blob = new Blob([data], { type: fileType });
    saveAs(blob, fileName);
  } catch (error) {
    console.error('File saving error:', error);
    throw new Error('Failed to save file');
  }
};

/**
 * Creates a file object from encrypted data and file info
 * @param decryptedData The decrypted data
 * @returns An object with file content and metadata
 */
export const extractFileFromDecryptedData = (decryptedData: string): { 
  content: string; 
  name: string; 
  type: string;
} => {
  try {
    if (isValidJSON(decryptedData)) {
      const fileData = JSON.parse(decryptedData);
      
      if (fileData.type && fileData.name && fileData.content) {
        return fileData;
      }
    }
    
    // If not a valid file object, treat as plain text
    return {
      content: decryptedData,
      name: 'decrypted.txt',
      type: 'text/plain'
    };
  } catch (error) {
    console.error('Error extracting file:', error);
    return {
      content: decryptedData,
      name: 'decrypted.txt',
      type: 'text/plain'
    };
  }
};