export type EncryptionMode = 'text' | 'file';

export interface FileData {
  name: string;
  type: string;
  content: string;
}

export interface EncryptedData {
  data: string;
  isFile: boolean;
  fileName?: string;
  fileType?: string;
}

export interface AppState {
  mode: 'encrypt' | 'decrypt';
  encryptionMode: EncryptionMode;
  inputText: string;
  password: string;
  encryptedData: string | null;
  decryptedData: string | null;
  file: File | null;
  fileName: string;
  fileContent: string | null;
  showQRCode: boolean;
  error: string | null;
  success: string | null;
}