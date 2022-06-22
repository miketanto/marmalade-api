const Pact = require("../pact-lang-api/pact-lang-api")

const uri = {
    "scheme":"somescheme",
    "data":"somedata"
}

const datum = {
    "name":"name",
    "data":"data",
    "URL":"ipfs url"
}
const createDatum = async (uri, datum)=> {
    //calling get-all() function from smart contract
      const res = await Pact.fetch.local(
        {
          pactCode: `(kip.token-manifest.create-datum (read-msg 'uri) (read-msg 'datum))`,
          //pact-lang-api function to construct transaction meta data
          envData: {uri, datum},
          meta: {
            "networkId": "testnet04",
            "chainId": 1,
            "host": "https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/1/pact" ,
            "creationTime": () => Math.round(new Date().getTime() / 1000) - 15,
            //gas price at lowest possible denomination
            "gasPrice": 0.000001,
            //high gas limit for tx
            "gasLimit": 100000,
            //time a tx lives in mempool since creationTime
            "ttl": 28800,
            //sender === gas payer of the transaction
            //  set to our gas station account defined in memory-wall-gas-station.pact
            "sender": "mw-free-gas",
            //nonce here doesnt matter since the tx will never have the same hash
            "nonce": "some nonce that doesnt matter",
          },
        },
        'https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/1/pact'
      );
      const all = res.result.data;
      //sorts memories by least recent
      console.debug(`local query data: (token-manifest.create-datum)`, {uri,datum}, all);
      return(all);
  };

  const datumWithHash = createDatum(uri,datum)