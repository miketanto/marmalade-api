export type ModuleApi = {
  contractName: string,
    gasStationName: string,
    namespace: string,
    contractAddress: string,
    gasStationAddress: string,
    explorerURL: string,
    constants: Object,
    meta: Meta
  }
  
  export type Meta = {
    networkId: string,
    chainId: string,
    host: string,
    creationTime: () => number,
    gasPrice: Number,
    gasLimit: Number,
    ttl: Number,
    sender: string,
    nonce : string
  }

  export type Policy = {
      api:ModuleApi,
      schema:Object,
  }

  export type Uri = {
    data:any,
    scheme:any
}

export type Datum = {
    hash: string,
    uri: Uri,
    datum: any
}

export type Manifest = {
    hash: string,
    data : Array<Datum>,
    uri: Uri
}

export type TypeWrapper = {
    type:string,
    value: Uri|Datum|Manifest
}

export type SigExecData = {
  hash:string,
  cmd:string,
  sigs:Object
}

export type Wallet = {
  signingKey:string, 
  networkId:string,
  gasPrice: Number|string,
  gasLimit: Number|string,
  accountName:string
}

export type Guard = {
    pred:string,
    keys:Array<string>
}

export type Sale = {
  "tokenId":string,
  "seller": string,
  "buyer":string,
  "amount":Number,
  "timeout":Number,
  "saleId": string,
  "price":Number
}