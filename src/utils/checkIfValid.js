import React, { useEffect } from 'react';

function CheckIfValid(data){
    
    useEffect(() => {
        const apiGet = () => {
            fetch("https://api.etherscan.io/api?module=account&action=txlist&address=0x69ce25019cF12de7f78f489cD413A868e44e251c&startblock=0&endblock=99999999&sort=asc&apikey=VG1YJWX62VE7Y1G5JENHKSCASJZ4EJ33ZJ")
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
            });
        };
    }, [])
    


    var valid = "";
    data? valid = true : valid = false;

    return valid;
}

export default CheckIfValid;