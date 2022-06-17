
import {fqpSchema, fqrpSchema} from '../constants/policyApi'

export const checkSchema = (subject: Object, schema:Object): Boolean=>{
    let currentTypeCheck:Boolean = true;
    Object.keys(schema).forEach((key)=>{
        //Base Case
        if(!((subject as any).hasOwnProperty(key))) {
            console.log(`Schema doesn't match at ${key}`); 
            currentTypeCheck = false; return false
        };

        
        if((typeof((schema as any)[key]) === 'object') && currentTypeCheck){
            currentTypeCheck = checkSchema((subject as any)[key],(schema as any)[key]);
        }
    })
    return currentTypeCheck
}

export const checkSchemaTest = ()=>{
    const wrongfqrpSchema = {
        "manifest": "Manifest",
        "token_spec": {
          "fungible": {
            "refNa": {
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
    console.log(checkSchema(wrongfqrpSchema, fqrpSchema))
    return true
}