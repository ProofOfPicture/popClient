
class Broadcaster {
    constructor() {}


    broadcastPictureHash(pictureHash: string, wallet: Wallet) {
        if (!wallet.utxos[0]) {
            throw "No coins found in the wallet.";
        }

        // instance of transaction builder
        let transactionBuilder = new BITBOX.TransactionBuilder("bitcoincash");
        // original amount of satoshis in vin
        let originalAmount = wallet.utxos[0].satoshis;

        // index of vout
        let vout = result[0].vout;

        // txid of vout
        let txid = result[0].txid;

        // add input with txid and index of vout
        transactionBuilder.addInput(txid, vout);

        // get byte count to calculate fee. paying 1 sat/byte
        let byteCount = BITBOX.BitcoinCash.getByteCount(
            { P2PKH: 1 },
            { P2PKH: 1 }
        );

        if (originalAmount < byteCount) {
            throw `Insufficient funds. You need at least ${byteCount} satoshi for the fee`;
        }

        // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
        let changeAmount = originalAmount - byteCount;

        // add output w/ address and amount to send
        transactionBuilder.addOutput(wallet.cashAddress, changeAmount);

        // keypair
        let keyPair = BITBOX.HDNode.toKeyPair(wallet.masterKey);

        // sign w/ HDNode
        let redeemScript = `OP_RETURN ${pictureHash}`;
        transactionBuilder.sign(
            0,
            keyPair,
            redeemScript,
            transactionBuilder.hashTypes.SIGHASH_ALL,
            changeAmount
        );

        // build tx
        let tx = transactionBuilder.build();
        // output rawhex
        let hex = tx.toHex();
        this.setState({
            hex: hex
        });

        // sendRawTransaction to running BCH node
        BITBOX.RawTransactions.sendRawTransaction(hex).then(
            result => {
                this.setState({
                    txid: result
                });
            },
            err => {
                console.log(err);
            }
        );

        return {
            transaction_hash: "something"
        }
    }
}