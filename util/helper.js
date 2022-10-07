import Web3 from "web3"
import { providerUrl } from "./constants"

export const createrProvider = () => {
    return new Web3(new Web3.providers.WebsocketProvider(providerUrl));
}

export const EtherScanUrl = (txnHash) => {
    return `https://goerli.etherscan.io/tx/${txnHash}`;
}