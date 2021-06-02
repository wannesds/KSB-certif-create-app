import React, { useEffect, useState } from 'react';
import { SendTxn } from './sendTxn';

function QueItem({data}){
    const [resTxHash, setResTxHash] = useState('');

    useEffect(() => {
        console.log('useEffect resTxHash : ' , resTxHash)
    },[resTxHash])

    const callSendTxn = (e) => {
        e.preventDefault();
        
        const res =  SendTxn(data, (txHash => res))
        setResTxHash(res);
        console.log('callSendTxn' , resTxHash, 'test', res)
    }

    return(
        <div>
            <p>{data.certifID}</p>
            <p>{data.webID}</p>
            <input
                type="text"
                Value={resTxHash}
            />
            <button onClick={callSendTxn}>
                Put on Chain
            </button>
        </div>
    );
}

export default QueItem;