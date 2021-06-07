import { useEffect, useState } from 'react';
import CreateHash  from '../utils/createHash';

function CheckIfValid(data, txnList){
    //hash A == hash B ? -> return 'true'
    const hash_A = CreateHash(data.webID, data.certifID, (res => res))


    var valid = "";
    data? valid = true : valid = false;

    return data;
}

export default CheckIfValid;