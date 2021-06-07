import React, { useEffect, useState } from 'react';
import { SendTxn } from './sendTxn';
import CheckIfValid from '../utils/checkIfValid';

function QueItem({data, txnList}){
    const [chainValid, setChainValid] = useState('')
    const [validTxn, setValidTxn] = useState('')

    // useEffect(() => {

    // }, [chainValid])

    const callSendTxn = (e) => {
        e.preventDefault()  
        SendTxn(data)
    }

    const callCheckIfValid = () => {
         const result = CheckIfValid(data, txnList, (res => res))
         setChainValid(result.state)
         setValidTxn(result.validTxn)
         console.log(chainValid)
         //e.preventDefault()
    }
    console.log('queItem for ', data.certifID)

    return(
        <div>
            <p>{data.certifID}</p>
            <p>{data.webID}</p>
            <button onClick={callSendTxn}>
                Put on Chain
            </button>
            <p>on Chain : {chainValid? "Yes" : "No"}</p>
            <button onClick={callCheckIfValid}>
                Check if Valid on chain
            </button>
        </div>
    );
}

export default QueItem;