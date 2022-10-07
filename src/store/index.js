import { action, makeAutoObservable, observable } from "mobx";
import { accountHex, privateKey, gasPrice } from "../../util/constants";
import { createrProvider } from "../../util/helper";
class Store {
    txnState = [];
    value = '';
    rAddress = '';
    balance = '';
    isLoadingBalance = false;
    web3 = createrProvider();
    isTxnScreen = false;
    curTxnStatus = null; // current transaction status

    processTxn = async () => {
        this.setTxnLoader('running');
        if (this.web3 == null) {
            this.web3 = createrProvider();
        }
        var _hex_value = this.web3.utils.toHex(this.web3.utils.toWei(this.value, 'ether'));
        var _hex_Gas = this.web3.utils.toHex(gasPrice);
        const rawTx = {
            to: this.rAddress,
            from: accountHex,
            gas: _hex_Gas,
            value: _hex_value,
        }
        console.log(rawTx);
        const signedTransaction = await this.web3.eth.accounts.signTransaction(rawTx, privateKey);
        this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
            .on('transactionHash', async (hash) => {
                this.setTxnLoader(null);
                const newTxn = { transactionHash: hash, ...rawTx };
                this.addTxn(newTxn);
                this.toggleTxnScreen();
            }).on('error', (error) => {
                alert(error);
                this.setTxnLoader(null);
            }).on('receipt', async (receipt) => {
                const txnDetails = await this.web3.eth.getTransaction(receipt.transactionHash);
                this.txnState.map((value, index) => {
                    if (value.transactionHash == receipt.transactionHash) {
                        this.setTxnState(index, txnDetails);
                        this.getBalance();
                    }
                });
            });
    }

    //SETTERS
    setTxnLoader = (val) => {
        this.curTxnStatus = val;
    }
    setBalLoader = (isRunning) => {
        this.isLoadingBalance = isRunning;
    }
    setBalance = (val) => {
        this.balance = val;
    }
    setValue = (val) => {
        this.value = val;
    }
    setRAdd = (address) => {
        this.rAddress = address;
    }
    setTxnState = (index, new_state) => {
        if (index >= 0 && index < this.txnState.length) {
            this.txnState[index] = new_state;
        }
    }
    toggleTxnScreen = () => {
        this.isTxnScreen = !this.isTxnScreen;
    }
    addTxn = (hash) => {
        this.txnState.push(hash);
    }

    //GETTERS
    getBalance = async () => {
        this.setBalLoader(true);
        if (this.web3 == null) {
            this.web3 = createrProvider();
        }
        this.web3.eth.getBlockNumber(async (error, blockNum) => {
            const balance = await this.web3.eth.getBalance(accountHex, blockNum);
            this.setBalance(this.web3.utils.fromWei(balance, "ether") + " ETH");
            this.setBalLoader(false);
        });
    }

    constructor(arg) {
        makeAutoObservable(this, {
            txnState: observable,
            value: observable,
            rAddress: observable,
            submit: action,
            setValue: action,
            setRAdd: action,
            setTxnState: action,
            getBalance: action,
            setBalance: observable,
            setBalLoader: action,
            processTxn: action,
            web3: observable,
        });
    }
};
export const type_store = typeof (store);
export default new Store();


// d3f0b1e54c6ef7e377bcc9fe9d85c11cee779cb800dd06cf83acfa77322b9b01