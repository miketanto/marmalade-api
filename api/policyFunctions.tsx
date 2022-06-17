/**
 * Module: Policy Builder
 * Funtionality: 
 * --Provide routing to common default policies:
 * 1. Amount of Royalty
 * 2. Fixed Quote or not and amount
 * 3. Guard Policies spliced
 * 4. Soulbound?
 * 
 * --Provide option for uploading custom policy contract name
 * 
 * API:
 * 
 * composeCustomPolicy()
 * @param policy: utf-8//url
 * @returns Policy object
 * Functionality: Read utf-8 string for enforce-init and find schema from there
 * 
 */
import { fqpAPI, fqrpAPI, fqpSchema, fqrpSchema } from '../constants/policyApi'
import {ModuleApi, Policy} from '../types/customTypes'

/**
 * composeDefaultPolicy({royalty, fixed quote}) // Will be extended  with possible guard policy etc.
 * @param royalty:bool
 * @param fixedQuote: bool
 * @param guard: bool
 * @return Policy object:
 * {
 *  api:Object
 *  paramSchema: Object
 *  contractAddress: string
 * }
 */
 export const composeDefaultPolicy = (royalty:Boolean, fixedQuote:Boolean):Policy =>{
     const api:ModuleApi = fixedQuote? (royalty? fqrpAPI:fqpAPI):fqpAPI
     const schema:Object =  fixedQuote? (royalty? fqrpSchema:fqpSchema):fqpSchema
     const policy = {
         api : api,
         schema : schema
     }
     return policy
 }