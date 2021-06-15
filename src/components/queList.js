import React, {useEffect, useState} from 'react';
import CheckQue from '../utils/checkQue';
import QueItem from './queItem';
//import { GetAllTxns } from '../utils/getAllTxns';

function QueList({certifList, setCertifList}){
    const queListFeed = CheckQue(res => res)
   
    return(
        <section className="pa2">
            { queListFeed.map( item => 
                <QueItem 
                    data={item} 
                    certifList={certifList} 
                    setCertifList={setCertifList}
                /> 
            ) }
        </section>
    );
}

export default QueList;