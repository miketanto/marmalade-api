import * as token from './api/tokenFunctions'
import * as manifest from './api/manifestFunctions'
import * as policy from './api/policyFunctions'
import * as transaction from './api/orderBookFunctions'

const Marmalade = {
    token:token,
    manifest:manifest,
    policy:policy,
    transaction:transaction
}
export default Marmalade