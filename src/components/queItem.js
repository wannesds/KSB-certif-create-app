import React, { useEffect, useState } from 'react';
import { SendTxn } from '../utils/sendTxn';
import CheckIfValid from '../utils/checkIfValid';
import AddCertif from '../components/addCertif';
//import GetAllTxns from '../utils/getAllTxns';



function QueItem({data, certifList, setCertifList}){

    const user = window.ethereum.selectedAddress;
    const api = useState(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${user}&startblock=0&endblock=99999999&sort=asc&apikey=VG1YJWX62VE7Y1G5JENHKSCASJZ4EJ33ZJ`)
    const [chainValid, setChainValid] = useState('')
    const [validTxn, setValidTxn] = useState('')
    const [txnList, setTxnList] = useState('')

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
    },[])

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

    //change this function, import AddCertif thru other way
    // const callAddCertif = () => {
    //     //bug with react hooks? :s
    //     const result = AddCertif(data, validTxn, certifList, setCertifList, (res => res))
    //     console.log('Stored on Pod? ', result)
    // }

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
            {/* <button hidden={!chainValid} onClick={callAddCertif}>
                Store on my Pod
            </button> */}
            { !chainValid ? null :
            //should add extra check to see if certif is already on Pod 
            //or give error
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