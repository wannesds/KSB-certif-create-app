import React from 'react';
import {Web3 } from 'web3';

function SendTxn({}){

    //section for connecting to eth thru metamask, put in own file and call it when user wants to do a transaction
    window.addEventListener('load', async () => {
    //const Web3 = require('web3');
    const web3 = new Web3("https://eth-rinkeby.alchemyapi.io/v2/aOmf3RlJunKUJcRWbVXWMdZukj_SMvTl");
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3("https://eth-rinkeby.alchemyapi.io/v2/aOmf3RlJunKUJcRWbVXWMdZukj_SMvTl");
        try {
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
  
            //parameters will have to be optimised for easier usage, especially GAS
              const transactionParameters = {
                //nonce: '0x00', // ignored by MetaMask
                gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
                gas: '0x6710', // customizable by user during MetaMask confirmation.
                to: "0x69ce25019cF12de7f78f489cD413A868e44e251c", // Required except during contract publications.
                from: window.ethereum.selectedAddress, // must match user's active address.
                value: '100000000000', // Only required to send ether to the recipient from the initiating external account.
                data: '0x0aaa', // Optional, but used for defining smart contract creation and interaction.
                chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
              };
              // // txHash is a hex string
              // // "As with any RPC call, it may throw an error"
              const txHash = await window.ethereum.request({
                //transaction gets signed with Browser Wallet
                method: 'eth_sendTransaction',
                params: [transactionParameters],
              })//callback hash passed down
              .then(txHash => {
                //transaction gets send to on-chain 
                window.ethereum.request({
                  method: 'eth_sendRawTransaction',
                  params: [txHash],
                })
              });
              //Show transaction processing progress, NEEDED UX feature 
  
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
    });

}

export default SendTxn;