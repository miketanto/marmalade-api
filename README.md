# marmalade-api

Library/API for using marmalade functions

SubAPIs
1. Policy API (marmalade-api.policy.${functionName})

     i. composeDefaultPolicy({royalty, fixedQuote}) 
     
      Functionality: 
        --Provide routing to common default policies:
        1. Amount of Royalty
        2. Fixed Quote or not and amount
        3. Guard Policies spliced
        4. Soulbound?

2. Manifest API (marmalade-api.manifest.${functionName})

      i. createUri
      
      Functionality: returns Uri shaped Object

      ii. createDatum
      
      Functionality: Calls manifest contract locally to get a hash on a datum (Singular piece of data).

      iii.  createManifest
      
     Functionality: hash data and uri and return a manifest, ready to be made token manifest
  
  3. Token API(marmalade-api.token.${functionName})
  
       i. createTokenSignature
       
        Functionality: create raw signature command for create-token, which needs to be copied to Chainweaver SigBuilder (For now)

      ii. mintTokenSignature
      
        Functionality: create raw signature command for mint-token, which needs to be copied to Chainweaver SigBuilder (For Now)