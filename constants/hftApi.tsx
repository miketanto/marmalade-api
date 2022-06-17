import {hftContractName, hftNamespace, hftConstants} from '../config/config'
import {networkId, chainId, host, apiHost, gasStationName, creationTime, globalConfig } from '../config/config.js' //Might move to marmalade passable config

export const hftAPI = {
    contractName: hftContractName,
    gasStationName: gasStationName,
    namespace: hftNamespace,
    contractAddress: `${hftNamespace}.${hftContractName}`,
    gasStationAddress: `${hftNamespace}.${gasStationName}`,
    explorerURL: `https://explorer.chainweb.com/${networkId.slice(0, -2)}`,
    constants: hftConstants,
    meta: {
      networkId: networkId,
      chainId: chainId,
      host: host,
      apiHost: apiHost,
      creationTime: creationTime,
      //gas price at lowest possible denomination
      gasPrice: globalConfig.gasPrice,
      //high gas limit for tx
      gasLimit: globalConfig.gasLimit,
      //time a tx lives in mempool since creationTime
      ttl: 28800,
      //sender === gas payer of the transaction
      //  set to our gas station account defined in memory-wall-gas-station.pact
      sender: "mw-free-gas",
      //nonce here doesnt matter since the tx will never have the same hash
      nonce: "some nonce that doesnt matter",
    },
  };