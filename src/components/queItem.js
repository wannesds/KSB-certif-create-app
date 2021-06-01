import React from 'react';
import { SendTxn } from './sendTxn';

function QueItem({data}){

    return(
        <div>
            <p>{data.certifID}</p>
            <p>{data.webID}</p>
            <button onClick={() => SendTxn(data)}>
                Put on Chain
            </button>
        </div>
    );
}

export default QueItem;