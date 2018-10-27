
let BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk').default
let BITBOX = new BITBOXSDK()

class Wallet {
  constructor (masterKey, cashAddress) {
    this.cashAddress = cashAddress
    this.masterKey = masterKey

    BITBOX.Address.utxo(cashAddress).then(
      result => {
        if (!result[0]) {
          return
        }
        this.utxos = result
      }
    )
  }
}

class WalletBuilder {
  createWallet () {
    let randomBytes = BITBOX.Crypto.randomBytes(32)
    let mnemonic = BITBOX.Mnemonic.fromEntropy(randomBytes)
    let rootSeed = BITBOX.Mnemonic.toSeed(mnemonic)
    let hdNode = BITBOX.HDNode.fromSeed(rootSeed, 'testnet')
    let masterKey = BITBOX.HDNode.toXPriv(hdNode)
    let purpose = "44'"
    let coin = "145'"
    let path = `m/${purpose}/${coin}/0`
    let account = BITBOX.HDNode.derivePath(hdNode, path)
    let privateKeyWIF = BITBOX.HDNode.toWIF(BITBOX.HDNode.derive(account, 0))
    let publicKey = BITBOX.ECPair.toCashAddress(BITBOX.ECPair.fromWIF(privateKeyWIF))

    return new Wallet(masterKey, publicKey)
  }
}

module.exports = {Wallet, WalletBuilder}
