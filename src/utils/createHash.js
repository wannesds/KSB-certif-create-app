import React from 'react';
import MerkleTree from 'merkletreejs';
import SHA256 from 'crypto-js/sha256';

function CreateHash({WebID, Certif}) {
    const leaves = [WebID, Certif].map(x => SHA256(x))
    const tree = new MerkleTree(leaves, SHA256)
    const root = tree.getRoot().toString('hex')
    // const leaf = SHA256('a')
    // const proof = tree.getProof(leaf)
    // console.log(tree.verify(proof, leaf, root))
    return(root);
}

export default CreateHash;



