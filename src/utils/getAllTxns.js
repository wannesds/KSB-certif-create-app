import React, { useEffect, useState } from 'react';

function GetAllTxns(){
    //const [txnList, setTxnList] = useState('');
    const user = window.ethereum.selectedAddress;
    const api = useState(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${user}&startblock=0&endblock=99999999&sort=asc&apikey=VG1YJWX62VE7Y1G5JENHKSCASJZ4EJ33ZJ`)
    //Don't use my API-key pl0x
    const fetchData = async () => {
        try {
            fetch(api)
            .then(response => response.json())
            .then(res => {return res})
        } catch (error) {
            console.log('Etherscan API fetch has failed')
        } 
    }
    fetchData();
    //return txnList;
}

export default GetAllTxns;