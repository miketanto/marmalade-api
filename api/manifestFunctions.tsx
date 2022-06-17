/**
 * Module: Manifest Creation 
 * Functionality: 
 * Api for creating uri, datum, and manifest
 * 
 * Functions: 
 *  @function createUri()
 *  @param scheme:Object
 *  @param data:Object
 */

import { manifestAPI } from '../constants/manifestApi'
import { makeApiMeta } from '../utils/apiUtils'
import { Uri, Datum, Manifest, TypeWrapper} from '../types/customTypes'
const Pact = require("../pact-lang-api/pact-lang-api")

 /**
  * createUri
  * Functionality: returns Uri shaped Object
  * @param scheme:Object
  * @param data: Object
  * @returns Uri
  */
 export const createUri = async (scheme:Object, data:Object):Promise<TypeWrapper> => {
    //calling get-all() function from smart contract
      const res = await Pact.fetch.local(
        {
          pactCode: `(${manifestAPI.contractAddress}.uri (read-string 'scheme) (read-string 'data))`,
          //pact-lang-api function to construct transaction meta data
          envData: {scheme, data},
          meta: makeApiMeta(manifestAPI),
        },
        manifestAPI.meta.host
      );
      const all:Uri = res.result.data;
      //sorts memories by least recent
      console.debug(`local query data: (${manifestAPI.contractAddress}.uri)`, {scheme,data}, all);
      return({'type':'uri', 'value': all});
  };


/**
 * createDatum
 * Functionality: Calls manifest contract locally to get a hash on a datum (Singular piece of data). 
 * 

 * @param uri :Uri (Could be used to give a name to the datum and schema of the datum)
 * @param datum : any (Any form of data we want to pass in)
 * @returns: Type wrapped Datum
 * 
 * Example Return:{
 * type : "datum",
 * value: {
      "hash": "1TM2jLXirkjvi21sgQszIw5XrHJuZKRZhND0k_4CHF8",
      "uri": {
        "data": "pact:schema",
        "scheme": "contract.schema"
      },
      "datum": {
        "assetUrl": "https://dna-tokens-test.s3.us-east-2.amazonaws.com/public/thumb_01680428-36db-46c2-b059-fe59f2ca5a4b.jpeg",
        "creationDate": "2022-02-09",
        "title": "Metal Industrial Complex No.1",
        "artistName": "Jamie McGregor Smith",
        "properties": {
          "medium": "Archival Lambda Colour Print",
          "supply": "5",
          "purchaseLocation": "Direct from Artist",
          "recordDate": "2022-02-09",
          "dimensions": "80x60cm",
          "description": "Signed By Artist And Supplied With Printers Certificate Of Authenticity"
        }
      }
    } 
}
 */
  export const createDatum = async (uri:Uri, datum:any):Promise<TypeWrapper>=> {
    //calling get-all() function from smart contract
      const res = await Pact.fetch.local(
        {
          pactCode: `(${manifestAPI.contractAddress}.create-datum (read-msg 'uri) (read-msg 'datum))`,
          //pact-lang-api function to construct transaction meta data
          envData: {uri, datum},
          meta: makeApiMeta(manifestAPI),
        },
        manifestAPI.meta.host
      );
      const all = res.result.data;
      //sorts memories by least recent
      console.debug(`local query data: (${manifestAPI.contractAddress}.create-datum)`, {uri,datum}, all);
      return({'type':'datum', 'value': all});
  };


  /**
   * createManifest
   * Functionality: hash data and uri and return a manifest, ready to be made token manifest
   * @param uri|Uri
   * @param data|Array<Datum>
   * @returns Type Wrapped Manifest
   */
  
  export const createManifest = async (uri:Uri, data:Array<Datum>):Promise<TypeWrapper> => {
    //calling get-all() function from smart contract
      const res = await Pact.fetch.local(
        {
          pactCode: `(${manifestAPI.contractAddress}.create-manifest (read-msg 'uri) (read-msg 'data))`,
          //pact-lang-api function to construct transaction meta data
          envData: {uri, data},
          meta:makeApiMeta(manifestAPI),
        },
        manifestAPI.meta.host
      );
      const all = res.result.data;
      //sorts memories by least recent
      console.debug(`local query data: (${manifestAPI.contractAddress}.create-manifest)`, {uri,data}, all);
      return({'type':'manifest', 'value': all});
  };