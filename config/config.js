/*

BLOCKCHAIN CONFIGURATION FILE

  initalize all data for pact-lang-api kadena blockchain calls

  modify this file to interact with different
    chains, networks, contracts

  documentation:
    https://pact-language.readthedocs.io/en/stable/

  pact tutorials:
    https://pactlang.org/

*/

//chain that contract lives on
export const chainId = "1";

//id of network version
export const networkId = "testnet04";

//network node
export const node = "api.testnet.chainweb.com";

//data host
export const dataHost = "data.testnet.chainweb.com:8080";

//unique contract name
export const hftNamespace = "marmalade";
export const hftContractName = "ledger";
export const hftConstants = {};

//unique contract name
export const manifestNamespace = "kip";
export const manifestContractName = "token-manifest";
export const manifestConstants = {};

//unique contract name
export const gtpNamespace = "marmalade";
export const gtpContractName = "guard-token-policy";
export const gtpConstants = {};

//unique contract name
export const fqpNamespace = "marmalade";
export const fqpContractName = "fixed-quote-policy";
export const fqpConstants = {};

//unique contract name
export const fqrpNamespace = "marmalade";
export const fqrpContractName = "fixed-quote-royalty-policy";
export const fqrpConstants = {};

//unique gas station contract name
export const gasStationName = "memory-wall-gas-station";

//chainweb api host
export const apiHost = `https://${node}`;

//pact api host to send requests
export const host = `https://${node}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;

//creation time for request
export const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;

export const globalConfig = {
  explorerURL: `https://explorer.chainweb.com/${networkId.slice(0, -2)}`,
  networkId: networkId,
  dataHost: dataHost,
  host: host,
  chainId: chainId,
  creationTime: creationTime,
  //gas price at lowest possible denomination
  gasPrice: 0.000001,
  //high gas limit for tx
  gasLimit: 100000,
  //time a tx lives in mempool since creationTime
  ttl: 28800,
  //sender === gas payer of the transaction
};




export const keyFormatter = (str) =>
  str.replace(new RegExp("[A-Z]+","gm")," $&").replace(new RegExp("^[a-z]","gm"),k => k.toUpperCase());