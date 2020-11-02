const spaces = 
{
  "build": {
      "name": "BUILD Finance",
      "network": "1",
      "symbol": "BUILD",
      "skin": "build",
      "strategies": [{
              "name": "erc20-balance-of",
              "params": {
                  "address": "0x6e36556b3ee5aa28def2a8ec3dae30ec2b208739",
                  "symbol": "BUILD",
                  "decimals": 18
              }
          },
          {
              "name": "uniswap",
              "params": {
                  "address": "0xDf6b861B4FBCFaffb62dD1906fCd3a863955704b",
                  "tokenAddress": "0x6e36556b3ee5aa28def2a8ec3dae30ec2b208739",
                  "symbol": "BUILD LP",
                  "decimals": 18
              }
          },
          {
              "name": "contract-call",
              "params": {
                  "address": "0x859a9d0d8bBF57C390A0BD8Fb4f5DE617e1De535",
                  "decimals": 18,
                  "symbol": "BUILD Staked",
                  "methodABI": {
                      "constant": true,
                      "inputs": [{
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                      }],
                      "name": "balanceOf",
                      "outputs": [{
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                      }],
                      "payable": false,
                      "stateMutability": "view",
                      "type": "function"
                  }
              }
          }
      ],
      "members": [
          "0x2Cb037BD6B7Fbd78f04756C99B7996F430c58172"
      ],
      "filters": {
          "defaultTab": "core",
          "minScore": 0
      }
  },
  "metric": {
      "name": "Metric.Exchange",
      "network": "1",
      "symbol": "METRIC",
      "strategies": [{
          "name": "erc20-balance-of",
          "params": {
              "address": "0xefc1c73a3d8728dc4cf2a18ac5705fe93e5914ac",
              "symbol": "METRIC",
              "decimals": 18
          }
      }],
      "members": [
          "0x2Cb037BD6B7Fbd78f04756C99B7996F430c58172"
      ],
      "filters": {
          "defaultTab": "core",
          "minScore": 100
      }
  }
}

class Client {
  request(command, body?) {
    const url = `${process.env.VUE_APP_HUB_URL}/api/${command}`;
    let init;
    if (body) {
      init = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      };
    }
    if (command == "spaces") {
      return new Promise((resolve, reject) => {
          try {
            return resolve(spaces);
          }
          catch (err) {
            return reject(err);
          }
      })
    }
    return new Promise((resolve, reject) => {
      fetch(url, init)
        .then(res => {
          if (res.ok) return resolve(res.json());
          throw res;
        })
        .catch(e => e.json().then(json => reject(json)));
    });
  }
}

const client = new Client();

export default client;
