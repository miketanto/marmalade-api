import {gtpContractName, gtpNamespace, gtpConstants} from '../config/config.js'
import {fqpContractName, fqpNamespace, fqpConstants} from '../config/config.js'
import {fqrpContractName, fqrpNamespace, fqrpConstants} from '../config/config'
import {networkId, chainId, host, gasStationName, creationTime, globalConfig } from '../config/config.js' //Might move to marmalade passable config

import {ModuleApi, Meta} from '../types/customTypes'

export const gtpAPI:ModuleApi = {
    contractName: gtpContractName,
    gasStationName: gasStationName,
    namespace: gtpNamespace,
    contractAddress: `${gtpNamespace}.${gtpContractName}`,
    gasStationAddress: `${gtpNamespace}.${gasStationName}`,
    explorerURL: `https://explorer.chainweb.com/${networkId.slice(0, -2)}`,
    constants: gtpConstants,
    meta: {
      networkId: networkId,
      chainId: chainId,
      host: host,
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
  
 export const fqpAPI:ModuleApi = {
    contractName: fqpContractName,
    gasStationName: gasStationName,
    namespace: fqpNamespace,
    contractAddress: `${fqpNamespace}.${fqpContractName}`,
    gasStationAddress: `${fqpNamespace}.${gasStationName}`,
    explorerURL: `https://explorer.chainweb.com/${networkId.slice(0, -2)}`,
    constants: fqpConstants,
    meta: {
      networkId: networkId,
      chainId: chainId,
      host: host,
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
  
  export const fqrpAPI:ModuleApi = {
    contractName: fqrpContractName,
    gasStationName: gasStationName,
    namespace: fqrpNamespace,
    contractAddress: `${fqrpNamespace}.${fqrpContractName}`,
    gasStationAddress: `${fqrpNamespace}.${gasStationName}`,
    explorerURL: `https://explorer.chainweb.com/${networkId.slice(0, -2)}`,
    constants: fqrpConstants,
    meta: {
      networkId: networkId,
      chainId: chainId,
      host: host,
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
  /*export type fqpSchema =  {
  "manifest": Manifest
  "mint-guard": Object,//Might change to guard
  "max-supply": Number,
  "min-amount": Number,
}

export type fqrpSchema = {
  "manifest": Manifest,
  "token_spec": {
    "fungible": {
      "refName": {
        "namespace":string,
        "name":string
      },
      "refSpec": [
        {
        "namespace":string,
        "name":string
      }]
    },
    "creator": string,
    "creator-guard": Object,
    "mint-guard": Object,
    "max-supply": Number,
    "min-amount": Number,
    "royalty-rate": Number
  }
}*/

/*export type schemaSelector<T extends fqrpSchema|fqpSchema|Object> = T extends fqpSchema? fqpSchema:(T extends fqrpSchema? fqrpSchema: Object);*/

export const fqpSchema = {
  "manifest": "Manifest",
  "mint-guard": "Object",//Might change to guard
  "max-supply": "Number",
  "min-amount": "Number",
}

export const fqrpSchema = {
  "manifest": "Manifest",
  "token_spec": {
    "fungible": {
      "refName": {
        "namespace":"string",
        "name":"string"
      },
      "refSpec": [
        {
        "namespace":"string",
        "name":"string"
      }]
    },
    "creator": "string",
    "creator-guard": "Object",
    "mint-guard": "Object",
    "max-supply": "Number",
    "min-amount": "Number",
    "royalty-rate": "Number"
}
}