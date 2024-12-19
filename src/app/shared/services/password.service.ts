import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor() { }

  encryptPassword(password: string): string {
    const secretKey = 'your-secret-key'; // Usa una clave segura
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  }

  decryptPassword(encryptedPassword: string): string {
    const secretKey = 'your-secret-key';
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
