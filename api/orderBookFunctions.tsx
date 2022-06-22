/**
 * Module: Order Book Api
 * Functionality: 
 * - Offer and Buy tokens with fixed Quote(royalty or non-royalty) policies
 * 
 * 
 * 
 */

import { hftAPI } from "../constants/hftApi";
import { signExecHftCommand, signContHftCommand } from "../utils/apiUtils";
import { SigData } from "../utils/Pact.SigBuilder";
import {Wallet, Guard, Sale} from '../types/customTypes'

export const saleTokenSignature = (
  wallet:Wallet,
  seller:string,
  amount:Number,
  price:Number, 
  recipient:string, 
  recipientGrd:Guard|string, 
  tokenId:string, 
  timeLimit:Number,
  fungibleTokenContract:string)=>{
        let result
        const parsedGuard = typeof(recipientGrd) === "string"? JSON.parse(recipientGrd):recipientGrd
        const quote = {
          "price": price,
          "recipient": recipient,
          "recipient-guard": parsedGuard,
          "fungible": {
            "refName": {
              "namespace":null,
              "name":fungibleTokenContract
            },
            "refSpec": [
              {
              "namespace":null,
              "name":"fungible-v2"
            }]
          }
        };
       
        result = signExecHftCommand(wallet,
          `(${hftAPI.contractAddress}.sale "${tokenId}" "${seller}" (read-decimal 'amount) (read-integer 'timeout))`,
          { amount: amount,
            timeout: timeLimit,
            quote
          },
          [SigData.mkCap(`${hftAPI.contractAddress}.OFFER`,[tokenId, seller, amount , {int: timeLimit}])]
        );
        return result
}

export const saleTokenSignatureAndObject = ( wallet:Wallet,
  seller:string,
  amount:Number,
  price:Number, 
  recipient:string, 
  recipientGrd:Guard|string, 
  tokenId:string, 
  timeLimit:Number,
  fungibleTokenContract:string)=>{
    const sigData = saleTokenSignature(wallet,seller,amount,price,recipient,recipientGrd,tokenId,timeLimit,fungibleTokenContract)
    const saleObj = {
      "tokenId":tokenId,
      "seller":seller,
      "buyer":"",
      "amount":amount,
      "timeout":timeLimit,
      "saleId": sigData.hash,
      "price":price
    }
    return {sigData,saleObj}
}

export const buyTokenSignature = (wallet:Wallet, pactId:string, buyer:string, buyerGrd:Guard|string,saleObj:Sale)=>{
  const parsedGuard = typeof(buyerGrd) === "string"? JSON.parse(buyerGrd):buyerGrd
  const{ tokenId, seller, amount,timeout,saleId,price} = saleObj
  let result = signContHftCommand(pactId, 1, false, wallet,"",
      { buyer: buyer,
        "buyer-guard": parsedGuard,
      },
      [
        SigData.mkCap(`${hftAPI.contractAddress}.BUY`,[tokenId, seller, buyer, amount, {"int": timeout}, saleId]),
        SigData.mkCap(`coin.TRANSFER`, [buyer, seller, (amount as number) * (price as number)])
      ]
    );
    saleObj.buyer = buyer;
    return result
}

export const withdrawTokenSignature = (wallet:Wallet, pactId:string, saleObj:Sale)=>{
  const{ tokenId, seller, amount,timeout,saleId,price} = saleObj
  let result = signContHftCommand(saleId, 0, true, wallet,"",{},[])
  return result
}