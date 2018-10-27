
const { WalletBuilder } = require("./createWallet");

let wallet = new WalletBuilder().createWallet();

console.log(`Cash address: ${wallet.cashAddress}`);
console.log(`Pivate key: ${wallet.masterKey}`);


