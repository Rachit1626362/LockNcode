import CryptoJS from 'crypto-js';

/**
 * Encrypts text or file data using AES encryption
 * @param data The text or file data to encrypt
 * @param password The password to use for encryption
 * @returns The encrypted data as a string
 */
export const encryptData = (data: string, password: string): string => {
  try {
    const encrypted = CryptoJS.AES.encrypt(data, password).toString();
    return encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

/**
 * Decrypts data using AES decryption
 * @param encryptedData The encrypted data
 * @param password The password used for encryption
 * @returns The decrypted data as a string
 */
export const decryptData = (encryptedData: string, password: string): string => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, password);
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedText) {
      throw new Error('Incorrect password or corrupted data');
    }
    
    return decryptedText;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data. Incorrect password or corrupted data.');
  }
};

/**
 * Checks if the data is a valid JSON string
 * @param data The data to check
 * @returns True if the data is a valid JSON string, false otherwise
 */
export const isValidJSON = (data: string): boolean => {
  try {
    JSON.parse(data);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Decodes a base64 string
 * @param base64 The base64 string to decode
 * @returns The decoded data as a string
 */
export const decodeBase64 = (base64: string): string => {
  try {
    return atob(base64);
  } catch (error) {
    console.error('Base64 decoding error:', error);
    throw new Error('Failed to decode Base64 data');
  }
};

/**
 * Encodes data as base64
 * @param data The data to encode
 * @returns The encoded data as a base64 string
 */
export const encodeBase64 = (data: string): string => {
  try {
    return btoa(data);
  } catch (error) {
    console.error('Base64 encoding error:', error);
    throw new Error('Failed to encode data as Base64');
  }
};