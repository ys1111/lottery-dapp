import web3 from './web3';
import { abi } from './abi/Lottery.json';

// デプロイしたコントラクトアドレスを入力してください
const address = '0x582bed9a081a9a793de23c58ebaaf2787dac6ce4';

export default new web3.eth.Contract(abi, address);
