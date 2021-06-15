import { useState, useEffect } from 'react';
import CreateHash  from '../utils/createHash';
//import GetAllTxns from '../utils/getAllTxns';

function CheckIfValid(data, txnList){

        const array = txnList.result;

        console.log('!!!!', array)

        console.log('array: ', array)
        const hash = CreateHash(data, (resHash => resHash))

        const validTxn = array.find((resTxn) => resTxn.input === '0x' + hash)
        const state = validTxn ? true : false

        console.log('validTxn', validTxn)

    

    return {state: state, validTxn: validTxn}
}

export default CheckIfValid;