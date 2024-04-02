export class RandomStringGenerator {
    static generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static generateRandomMacAddress(): string {
        let macAddress = '';
        for (let i = 0; i < 6; i++) {
            macAddress += this.generateRandomString(2);
            if (i < 5) {
                macAddress += ':';
            }
        }
        return macAddress;
    }
}
