import React, { useEffect, useState } from 'react';
import { SendTxn } from '../utils/sendTxn';
import CheckIfValid from '../utils/checkIfValid';
import AddCertif from '../components/addCertif';

function QueItem({data, certifList, setCertifList}){

    const [chainValid, setChainValid] = useState('')
    const [validTxn, setValidTxn] = useState('')
    const [txnList, setTxnList] = useState('')

    //custom alchemy API for connecting to an ethereum node, seems good for developing purposes and low scale app usage
    const user = window.ethereum.selectedAddress;
    //API key should be in back-end or no key to be used > less calls/sec
    const api = useState(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${user}&startblock=0&endblock=99999999&sort=asc&apikey=VG1YJWX62VE7Y1G5JENHKSCASJZ4EJ33ZJ`)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                fetch(api)
                .then(response => response.json())
                .then(res => setTxnList(res))
            } catch (error) {
                console.log('Etherscan API fetch has failed')
            } 
        }
        fetchData()
        //fetches all Transactions from given user
    },[])

    const callSendTxn = () => {
        SendTxn(data)
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