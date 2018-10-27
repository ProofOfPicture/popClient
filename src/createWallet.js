

let BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk').default;
let BITBOX = new BITBOXSDK();

export createWallet(password: string)
{
    const randomBytes = BITBOX.Crypto.randomBytes(32);
    const mnemonic = BITBOX.Mnemonic.fromEntropy(randomBytes);
    const rootSeed = BITBOX.Mnemonic.toSeed(mnemonic, password);

    let masterkey = BITBOX.HDNode.fromSeed(rootSeed);

    let purpose = "44'";
    let coin = "145'";
    let addresses = [];
    for (let i = 0; i < 10; i++) {
        let path = `m/${purpose}/${coin}/${i}`;
        let account = BITBOX.HDNode.derivePath(masterkey, path);
        addresses.push(BITBOX.HDNode.toWIF(BITBOX.HDNode.derive(account, 0)));
    }

    let publicKey = BITBOX.ECPair.toLegacyAddress(BITBOX.ECPair.fromWIF(privKeyWIF))
}