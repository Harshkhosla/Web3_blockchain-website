
import { useState } from 'react';
import './App.css';
import { ethers } from "ethers";
import {abi,contractAddress} from "./constant";

function App() {
  const [connection ,setConnection]=useState(true)
 
  const ConnectingTometamask=()=>{
    if(typeof window.ethereum!=="undefined"){
      window.ethereum.request({method:"eth_requestAccounts"})
      setConnection(true)
      
    }else{
      console.log("dont see it");
      setConnection(false)
    }
  }
   async function Fund(){
    const ethAmount ="77"
    if(typeof window.ethereum!=="undefined"){
      console.log(ethers);
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      console.log(signer);
      const contract =new ethers.Contract(contractAddress,abi,signer)
      try{

        const transactionResponse = contract.fund({
          value:ethers.utils.parseEther(ethAmount)
        })
        await listenForTransactionMine(transactionResponse, provider)
      }catch{
        console.log("byee");
      }
    }
  }
  function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}`)
    return new Promise((resolve, reject) => {
        try {
            provider.once(transactionResponse.hash, (transactionReceipt) => {
                console.log(
                    `Completed with ${transactionReceipt.confirmations} confirmations. `
                )
                resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}
  return (
    <div className="App">
      <button type="button" class="btn btn-primary" onClick={ConnectingTometamask}>{connection?"connected":"Connect"}</button>
      <button type="button" class="btn btn-primary" onClick={Fund}>Fund</button>
    </div>
  );
}

export default App;
