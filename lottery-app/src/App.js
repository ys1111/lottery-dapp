import React, { Component } from 'react';
import { Paper, AppBar, Typography, withStyles, Toolbar, Divider, CircularProgress, Button } from '@material-ui/core';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: '',
    isLoading: false
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'トランザクションを待ってます...', isLoading: true });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: '抽選に参加しました!', isLoading: false });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'トランザクションを待ってます...', isLoading: true });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: '抽選が選ばれました!', isLoading: false });
  };

  
  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static" className={classes.height} >
          <Toolbar>
            <Typography variant="title" color="inherit">
              抽選 dAppsゲーム
            </Typography>
          </Toolbar>
        </AppBar>

        <Paper className={classes.root} elevation={1}>
          <p>
            このコントラクトは {this.state.manager}　さんによって運営されてます。
            現在{' '}
            {this.state.players.length} 人が参加中です、 現在{' '}
            {web3.utils.fromWei(this.state.balance, 'ether')} ETHがプールされています!
          </p>

          <Divider />

          <form onSubmit={this.onSubmit}>
            <h4>抽選エントリー</h4>
            <div>
              <label>いくら送金しますか？</label>
              <input
                value={this.state.value}
                onChange={event => this.setState({ value: event.target.value })}
              />
            </div>
            <Button>送金</Button>
          </form>

          <Divider />

          <h4>抽選結果</h4>
          <Button onClick={this.onClick}>抽選する</Button>

          <Divider />

          {this.state.isLoading
          ? <div>
              <h1>{this.state.message}</h1>
              <CircularProgress className={classes.progress} size={50} />
            </div>
          : <h1>{this.state.message}</h1>}
        </Paper>
      </div>
    );
  }
}

const styles = theme => ({
      root: {
        display: 'flex',
        flexDirection: 'column',
        alineItems: 'center',
        flexGrow: 1,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin: '40px'
      },
      appbar: {
        height: '80'
      }
})

export default withStyles(styles)(App);
