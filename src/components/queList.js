import React, {useEffect, useState} from 'react';
import CheckQue from '../utils/checkQue';
import QueItem from './queItem';

function QueList({certifList, setCertifList}){
    const [txnList, setTxnList] = useState('')
    const [gasPrice, setGasPrice] = useState('')

    const user = window.ethereum.selectedAddress;
    //API key should be in back-end or no key to be used > less calls/sec
    const apiKey = useState("VG1YJWX62VE7Y1G5JENHKSCASJZ4EJ33ZJ")
    const gasPriceApi = useState(`https://api-rinkeby.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=${apiKey}`)
    const txnsApi = useState(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${user}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`)
    
    useEffect(() => {
        const fetchData = async (api, store) => {
            try {
                fetch(api)
                .then(response => response.json())
                .then(res => store(res))
            } catch (error) {
                console.log('Etherscan API fetch has failed')
            } 
        }
        fetchData(txnsApi, setTxnList)
        fetchData(gasPriceApi, setGasPrice)
        //fetches all Transactions from given user
    },[])

    const queListFeed = CheckQue(res => res)
   
    return(
        <section className="pa2">
            { queListFeed.map( item => 
                <QueItem 
                    data={item} 
                    certifList={certifList} 
                    setCertifList={setCertifList}
                    txnList={txnList}
                    gasPrice={gasPrice}
                /> 
            ) }
        </section>
    );
}

export default QueList;