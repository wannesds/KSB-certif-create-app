import { useState, useEffect } from 'react';
import CreateHash  from '../utils/createHash';
//import GetAllTxns from '../utils/getAllTxns';

function CheckIfValid(data, txnList){

        const array = txnList.result;
        const hash = CreateHash(data, (resHash => resHash))

        //checks if qued certificate hash is included in a Txn on-chain
        //this means the certif is stored succesfully on-chain
        const validTxn = array.find((resTxn) => resTxn.input === '0x' + hash)
        const state = validTxn ? true : false

    return {state: state, validTxn: validTxn}
}

export default CheckIfValid;