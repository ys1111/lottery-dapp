const Lottery = artifacts.require('../contracts/Lottery.sol');

module.exports = function(deployer, network, accounts) {

  return deployer
      .then(() => {
          return deployer.deploy(Lottery); 
      })
};
