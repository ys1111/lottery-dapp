var HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config()

var mnemonic = process.env.MNEMONIC;
var accessToken = process.env.INFURA_ACCESS_TOKEN;

module.exports = {
  networks: {
    ganacheGui: {
    host: "localhost",
    port: 7545,
    network_id: "*", // Match any network id
    gas: 6500000,
    gasPrice: 100000000000
    },
    development: {
    host: "localhost",
    port: 8545,
    network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          'https://rinkeby.infura.io/v3/' + accessToken
        );
      },
      network_id: "4",
      gas: 6500000,
      gasPrice: 100000000000
    }
 }
};
