import React, { useEffect, useState } from 'react';
import { SendTxn } from '../utils/sendTxn';
import CheckIfValid from '../utils/checkIfValid';
import AddCertif from '../components/addCertif';

function QueItem({data, certifList, setCertifList, txnList, gasPrice}){

    const [chainValid, setChainValid] = useState('')
    const [validTxn, setValidTxn] = useState('')
    console.log('validTxn :', validTxn)

    const callSendTxn = () => {
        SendTxn(data, gasPrice)
    }

    const callCheckIfValid = () => {
        //checks if qued certificate is validated on-chain
         const result = CheckIfValid(data, txnList, (res => res))
         setChainValid(result.state)
         setValidTxn(result.validTxn)
    }

    return(
        <div className="b--dashed bw1 pa1 ma1 flex ">
            <section>
                <p>{data.certifID}</p>
                <p>{data.webID}</p>
            </section>
            
            <button onClick={callSendTxn} className="ma3">
                Put on Chain
            </button>

            <p>on Chain : {chainValid ? "Yes" : "No"}</p> 

            <button onClick={callCheckIfValid} className="ma3">
                Check if Valid on chain
            </button>

            { !chainValid ? null :
            //show button to add certificate Pod AFTER certif is found on-chain
            //maybe add extra check to see if certif is already on Pod or give error
                <AddCertif 
                    data={data} 
                    validTxn={validTxn} 
                    certifList={certifList} 
                    setCertifList={setCertifList}
                /> 
            }
            
        </div>
    );
}

export default QueItem;