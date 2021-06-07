import React from 'react';
import CreateHash  from '../utils/createHash';

function CheckIfValid(data, txnList){
    //hash === hash stored in Txn ? -> return 'true'
    const array = txnList.result;
    const hash = CreateHash(data.webID, data.certifID, (res => res))

    const validTxn = array.find((txn) => txn.input === hash)

    console.log('validTxn', validTxn)

    var valid = "";
    data? valid = true : valid = false;

    return data;
}

export default CheckIfValid;