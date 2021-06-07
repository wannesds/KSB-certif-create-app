import React from 'react';
import CreateHash  from '../utils/createHash';

function CheckIfValid(data, txnList){
    //hash === hash stored in Txn ? -> return 'true'
    const array = txnList.result;
    console.log('array: ', array)
    const hash = CreateHash(data, (res => res))

    const validTxn = array.find((txn) => txn.input === '0x' + hash)
    const state = validTxn ? true : false

    console.log('validTxn', validTxn)

    return {state: state, validTxn: validTxn}
}

export default CheckIfValid;