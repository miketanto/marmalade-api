/**
 * Module: Ledger Functions 
 * Functionality: 
 * Api for Selling and Buying tokens
 * 
 * Functions: 
 *  @function createUri()
 *  @param scheme:Object
 *  @param data:Object
 */


import { hftAPI } from "../constants/hftApi";
import { signExecHftCommand, signContHftCommand } from "../utils/apiUtils";
import { SigData } from "../utils/Pact.SigBuilder";
import {Wallet, Guard} from '../types/customTypes'

export const transferCreateSig  = ( 
  wallet:Wallet,
  token:string,
  sender:string,
  receiver:string, 
  receiverKeyset:Guard|string, //parse this to ensure it's a string
  amount:Number
  )=>{
    const parsedKeyset = typeof(receiverKeyset)==="string"?JSON.parse(receiverKeyset):receiverKeyset //parse the keyset
    //Create the signature using the inputted parameters -> to be entered on chainweaver
    const sig = signExecHftCommand(wallet,
    `(${hftAPI.contractAddress}.transfer-create "${token}" "${sender}" "${receiver}" (read-keyset 'ks) (read-decimal 'amount))`,
    {ks: parsedKeyset, amount: amount},
    [SigData.mkCap(`${hftAPI.contractAddress}.TRANSFER`, [token, sender, receiver, amount])]);
    console.log(JSON.stringify(sig));
    return sig;
}

export const transfer = (
  wallet:Wallet,
  token:string,
  sender:string,
  receiver:string, 
  amount:Number
)=>{
    //Create the signature using the inputted parameters -> to be entered on chainweaver
    const sig = signExecHftCommand(wallet,
    `(${hftAPI.contractAddress}.transfer "${token}" "${sender}" "${receiver}" (read-decimal 'amount))`,
    {amount: amount},
    [SigData.mkCap(`${hftAPI.contractAddress}.TRANSFER`, [token, sender, receiver, amount])]);
    console.log(JSON.stringify(sig));
    return sig;
}

export const createAccount = (
  wallet:Wallet,
  token:string,
  accountName:string, 
  keysetPredicate:"keys-any"|"keys-all"|"keys-2", 
  guardKeys:Guard|string //parse this to ensure it's a string
)=>{
    const parsedKeyset = typeof(guardKeys)==="string"?JSON.parse(guardKeys):guardKeys //parse the keyset
    //Create the signature using the inputted parameters -> to be entered on chainweaver
    const sig = signExecHftCommand(wallet,
      `(${hftAPI.contractAddress}.create-account "${token}" "${accountName}" (read-keyset 'ks))`,
      {ks:{pred:keysetPredicate, keys:guardKeys}}
    );
    console.log(JSON.stringify(sig));
    return sig;
}