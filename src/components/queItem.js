import React, { useState } from 'react';
import { SendTxn } from './sendTxn';

function QueItem({data}){
    const [txHash, setTxHash] = useState('');

    return(
        <div>
            <p>{data.certifID}</p>
            <p>{data.webID}</p>
            <input
                type="text"
                value={txHash}
            />
            <button onClick={() => SendTxn(data,(txHash => setTxHash(txHash)))}>
                Put on Chain
            </button>
        </div>
    );
}

export default QueItem;