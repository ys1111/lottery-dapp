const { assertRevert } = require('./helpers/assertRevert');
const BigNumber = web3.BigNumber;

const Lottery = artifacts.require('Lottery.sol');

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('Lottery', function (accounts) {
  const creater = accounts[0]

  beforeEach(async () => {
    this.lottery = await Lottery.new({ from: creater });    
  });

  describe('Lottery Contract', () => {
    it('deploys a contract', () => {
      assert.ok(lottery.address);
    });

    it('allows one account to enter', async () => {
      await this.lottery.enter({
        from: accounts[0],
        value: web3.toWei(0.02, 'ether')
      });

      const players = await this.lottery.getPlayers()

      players[0].should.be.equal(accounts[0]);
      players.length.should.be.equal(1);
    });

    it('allows multiple accounts to enter', async () => {
      await this.lottery.enter({
        from: accounts[0],
        value: web3.toWei('0.02', 'ether')
      })
      await this.lottery.enter({
        from: accounts[1],
        value: web3.toWei('0.02', 'ether')
      })
      await this.lottery.enter({
        from: accounts[2],
        value: web3.toWei('0.02', 'ether')
      })

      const players = await this.lottery.getPlayers()

      accounts[0].should.be.equal(players[0]);
      accounts[1].should.be.equal(players[1]);
      accounts[2].should.be.equal(players[2]);
      assert.equal(3, players.length);
    });

    it('requires a minimum amount of ether to enter', async () => {
      await assertRevert(
        this.lottery.enter({
          from: accounts[0],
          value: 0
        })
      );
    });

    it('only manager can call pickWinner', async () => {
      await assertRevert(
        this.lottery.pickWinner({
          from: accounts[1]
        })
      );
    });

    it('sends money to the winner and resets the players array', async () => {
      await this.lottery.enter({
        from: accounts[0],
        value: web3.toWei('2', 'ether')
      });

      const initialBalance = await web3.eth.getBalance(accounts[0]);
      await this.lottery.pickWinner({ from: accounts[0] });
      const finalBalance = await web3.eth.getBalance(accounts[0]);
      const difference = finalBalance - initialBalance;

      assert(difference > web3.toWei('1.8', 'ether'));
    });

  });
});