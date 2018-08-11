import web3 from './web3';
import { abi } from './abi/Lottery.json';

// デプロイしたコントラクトアドレスを入力してください
const address = '0xaeecba27661c3cfc2d81f3f12f49fcfafce34088';

export default new web3.eth.Contract(abi, address);
