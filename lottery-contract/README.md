before deploy
```
$ touch .env
$ echo>>MNEMONIC="あなたのイーサリアムアカウントのニーモニック"
$ echo>>INFURA_ACCESS_TOKEN="INFURAで取得したアクセストークン"
```

deploy 
```
rinkeby test network // you must have ether on test network
$ truffle compile
$ truffle migrate --networrk rinkeby

web3VM
$ truffle compile
$ truffle migrate --network development
```
