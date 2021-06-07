import React, { useEffect, useState } from 'react';
import { SendTxn } from './sendTxn';
import CheckIfValid from '../utils/checkIfValid';
import AddCertif from '../components/addCertif';

function QueItem({data, txnList}){
    const [chainValid, setChainValid] = useState('')
    const [validTxn, setValidTxn] = useState('')

    const callSendTxn = () => {
        SendTxn(data)
    }

    const callCheckIfValid = () => {
         const result = CheckIfValid(data, txnList, (res => res))
         setChainValid(result.state)
         setValidTxn(result.validTxn)
         console.log(chainValid)
    }
    console.log('queItem for ', data.certifID)

    const callAddCertif = () => {
        const result = AddCertif(data, validTxn, (res => res))
        console.log('Stored on Pod? ', result)
    }

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
            <button hidden={!chainValid} onClick={callAddCertif}>
                Store on my Pod
            </button>
        </div>
    );
}

export default QueItem;