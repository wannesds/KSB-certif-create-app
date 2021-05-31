import React, { useState } from 'react';
import checkQue from '../utils/checkQue';
import QueItem from './queItem';

function QueList(){
    const queListFeed = checkQue(res => res);
    console.log(queListFeed)
    return(
        <section>
            { //queListFeed.map(item => <QueItem data={item}/>) 
            
            }
        </section>
    );
}

export default QueList;