import {
  SNAPSHOT_SUBGRAPH_URL,
  subgraphRequest
} from '@vfatouros/snapshot.js/src/utils';

export async function getDelegates(network, address, snapshot = 'latest') {
  const params = {
    delegations: {
      __args: {
        where: {
          delegator: address.toLowerCase()
        },
        first: 1000
      },
      space: true,
      delegate: true
    }
  };
  if (snapshot !== 'latest') {
    // @ts-ignore
    params.delegations.__args.block = { number: snapshot };
  }
  return await subgraphRequest(SNAPSHOT_SUBGRAPH_URL[network], params);
}

export async function getDelegators(network, address, snapshot = 'latest') {
  const params = {
    delegations: {
      __args: {
        where: {
          delegate: address.toLowerCase()
        },
        first: 1000
      },
      delegator: true,
      space: true
    }
  };
  if (snapshot !== 'latest') {
    // @ts-ignore
    params.delegations.__args.block = { number: snapshot };
  }
  return await subgraphRequest(SNAPSHOT_SUBGRAPH_URL[network], params);
}
