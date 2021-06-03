import React, { useEffect, useState } from 'react';
import { SendTxn } from './sendTxn';

function QueItem({data}){

    const callSendTxn = (e) => {
        e.preventDefault();   
        SendTxn(data);
    }

    return(
        <div>
            <p>{data.certifID}</p>
            <p>{data.webID}</p>
            <input
                type="text"
                //Value={resTxHash}
            />
            <button onClick={callSendTxn}>
                Put on Chain
            </button>
        </div>
    );
}

export default QueItem;