import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

@Injectable({
    providedIn: 'root',
})
export class EncryptionService {
    private secretKey = 'kjbjhbvjh';

    encrypt(data: string): string {
        return AES.encrypt(data, this.secretKey).toString();
    }

    decrypt(data: string): string {
        const bytes = AES.decrypt(data, this.secretKey);

        return bytes.toString(enc.Utf8);
    }
}
