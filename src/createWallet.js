let BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk').default;
let BITBOX = new BITBOXSDK();

class Wallet {

    utxos: AddressUtxoResult = [];
    masterKey: string;
    cashAddress: string;

    constructor(masterKey, cashAddress) {
        this.cashAddress = cashAddress;
        this.masterKey = masterKey;

        BITBOX.Address.utxo(cashAddress).then(
            result => {
                if (!result[0]) {
                    return;
                }
                this.utxos = result;
            }

        );
    }
}

class WalletBuilder {
    createWallet(password: string) {

        let masterKey = this.createPrivateKey(password);
        let publicKey = this.generatePublicKey(masterKey);

        return new Wallet(masterKey, publicKey);
    }

    createPrivateKey(password: string) {
        let randomBytes = BITBOX.Crypto.randomBytes(32);
        let mnemonic = BITBOX.Mnemonic.fromEntropy(randomBytes);
        let rootSeed = BITBOX.Mnemonic.toSeed(mnemonic, password);
        return BITBOX.HDNode.fromSeed(rootSeed);
    }

    generatePublicKey(masterKey) {
        let purpose = "44'";
        let coin = "145'";
        let path = `m/${purpose}/${coin}/${i}`;
        let account = BITBOX.HDNode.derivePath(masterKey, path);
        let privateKeyWIF = BITBOX.HDNode.toWIF(BITBOX.HDNode.derive(account, 0));
        return BITBOX.ECPair.toLegacyAddress(BITBOX.ECPair.fromWIF(privateKeyWIF));
    }
}
