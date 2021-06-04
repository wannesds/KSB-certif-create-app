import React, { useEffect, useState } from 'react';
import { SendTxn } from './sendTxn';
import CheckIfValid from '../utils/checkIfValid';

function QueItem({data}){
    const [chainValid, setChainValid] = useState('');

    useEffect(() => {

    }, [chainValid])

    const callSendTxn = (e) => {
        e.preventDefault();   
        SendTxn(data);
    }

    const callCheckIfValid = (e) => {
        e.preventDefault();
         const state = CheckIfValid(data, (res => res));
         setChainValid(state);
         console.log(chainValid)
         
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
                Is on Chain?
            </button>
        </div>
    );
}

export default QueItem;