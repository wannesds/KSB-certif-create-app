import React, {useEffect, useState} from 'react';
import CheckQue from '../utils/checkQue';
import QueItem from './queItem';
//import { GetAllTxns } from '../utils/getAllTxns';

function QueList(){
    const [txnList, setTxnList] = useState('');
    const user = window.ethereum.selectedAddress;
    const api = useState(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${user}&startblock=0&endblock=99999999&sort=asc&apikey=VG1YJWX62VE7Y1G5JENHKSCASJZ4EJ33ZJ`)
    const queListFeed = CheckQue(res => res)
    console.log('QueListFeed :', queListFeed)

    
    const callAllTxns = () => {
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
        console.log('callAllTxns hook works', txnList)
    }

    return(
        <section>
            <button onClick={callAllTxns}>
                Call/Refresh Transactions
            </button>
            { queListFeed.map(item => <QueItem data={item} txnList={txnList}/> ) }
        </section>
    );
}

export default QueList;