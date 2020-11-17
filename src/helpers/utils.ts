import pkg from '@/../package.json';

export function shorten(str = '') {
  return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
}

export function jsonParse(input, fallback?) {
  if (typeof input !== 'string') {
    return fallback || {};
  }
  try {
    return JSON.parse(input);
  } catch (err) {
    return fallback || {};
  }
}

export async function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export function clone(item) {
  return JSON.parse(JSON.stringify(item));
}

export function lsSet(key: string, value: any) {
  return localStorage.setItem(`${pkg.name}.${key}`, JSON.stringify(value));
}

export function lsGet(key: string) {
  const item = localStorage.getItem(`${pkg.name}.${key}`);
  return jsonParse(item, '');
}

export function lsRemove(key: string) {
  return localStorage.removeItem(`${pkg.name}.${key}`);
}

export function formatProposal(proposal) {
  proposal.msg = jsonParse(proposal.msg, proposal.msg);

  // v0.1.0
  if (proposal.msg.version === '0.1.0') {
    proposal.msg.payload.start = 1595088000;
    proposal.msg.payload.end = 1595174400;
    proposal.msg.payload.snapshot = 10484400;
    proposal.bpt_voting_disabled = '1';
  }

  // v0.1.1
  if (proposal.msg.version === '0.1.0' || proposal.msg.version === '0.1.1') {
    proposal.msg.payload.metadata = {};
  }

  return proposal;
}

export function formatProposals(proposals) {
  return Object.fromEntries(
    Object.entries(proposals).map(proposal => [
      proposal[0],
      formatProposal(proposal[1])
    ])
  );
}

export function filterNetworks(networks, spaces, q) {
  return Object.entries(networks)
    .map((network: any) => {
      network[1].key = network[0];
      network[1].spaces = Object.entries(spaces)
        .filter((space: any) => space[1].network === network[0])
        .map(space => space[0]);
      return network[1];
    })
    .filter(network =>
      JSON.stringify(network)
        .toLowerCase()
        .includes(q.toLowerCase())
    )
    .sort((a, b) => b.spaces.length - a.spaces.length);
}

export function filterSkins(skins, spaces, q) {
  return skins
    .map(skin => ({
      key: skin,
      spaces: Object.entries(spaces)
        .filter((space: any) => space[1].skin === skin)
        .map(space => space[0])
    }))
    .filter(skin => skin.key.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => b.spaces.length - a.spaces.length);
}

export function filterStrategies(strategies, spaces, q = '') {
  return Object.values(strategies)
    .map((strategy: any) => {
      strategy.spaces = Object.entries(spaces)
        .filter(
          (space: any) =>
            space[1].strategies &&
            space[1].strategies
              .map(strategy => strategy.name)
              .includes(strategy.key)
        )
        .map(space => space[0]);
      return strategy;
    })
    .filter(strategy =>
      JSON.stringify(strategy)
        .toLowerCase()
        .includes(q.toLowerCase())
    )
    .sort((a, b) => b.spaces.length - a.spaces.length);
}

export function formatSpace(key, space) {
  space = {
    key,
    ...space,
    members: space.members || [],
    filters: space.filters || {}
  };
  if (!space.filters.invalids) space.filters.invalids = [];
  if (!space.filters.minScore) space.filters.minScore = 0;
  console.log(space.strategies);
  if (key == "build") {
    space.strategies = [
      { "name" : "erc20-balance-of", 
        "params" : {
          "address": "0x6e36556b3ee5aa28def2a8ec3dae30ec2b208739",
          "symbol": "BUILD",
          "decimals": 18
        }
      },
      { "name" : "uniswap", 
        "params" : {
          "address": "0x6e36556b3ee5aa28def2a8ec3dae30ec2b208739",
          "symbol": "BUILD LP",
          "decimals": 18
        }
      },
      { "name" : "staked-uniswap", 
        "params" : {
          "tokenAddress": "0x6e36556b3ee5aa28def2a8ec3dae30ec2b208739",
          "uniswapAddress" : "0xdf6b861b4fbcfaffb62dd1906fcd3a863955704b",
          "stakingAddress" : "0xfd15657341492d1918e3a8b7421e9627d52056e9",
          "symbol": "Staked BUILD-ETH",
          "decimals": 18
        }
      },
      { "name" : "staked-uniswap", 
        "params" : {
          "tokenAddress": "0x6e36556b3ee5aa28def2a8ec3dae30ec2b208739",
          "uniswapAddress" : "0x21e5501bf8b5c7182f243e01127976f884a95912",
          "stakingAddress" : "0x6d9438cd0df10a78de373f5d9b5b5e7227e3822d",
          "symbol": "Staked BUILD-HYPE",
          "decimals": 18
        }
      }
    ]
  }
  return space;
}

export function getInjected() {
  const web3: any = window['ethereum'];
  if (!web3) return;
  let injected = { name: 'Injected', id: 'web3' };
  if (web3.isMetaMask) injected = { name: 'MetaMask', id: 'metamask' };
  if (web3.isTrust) injected = { name: 'Trust Wallet', id: 'trustwallet' };
  if (web3.isStatus) injected = { name: 'Status', id: 'status' };
  if (web3.isFrame) injected = { name: 'Frame', id: 'frame' };
  return injected;
}
