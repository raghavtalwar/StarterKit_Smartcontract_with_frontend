// Import libraries we need.
import Web3 from "web3";

// Import our contract artifacts and turn them into usable abstractions.
// Make sure you've ran truffle compile first

import contract_build_artifacts from "../build/contracts/FirstContract.json";

var FirstContractfetch = contract(contract_build_artifacts);

var accounts;
var account;

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      ready();
    }
  }


//import abi so that web3 knows how to interact with the smart contract
window.App = {

  // 'Constructor'
  start: function() {
    var self = this;

    // Bootstrap the Contract abstraction for use with the current web3 instance
    FirstContract.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(async function(err, accs) {

      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      web3.eth.defaultAccount = accounts[0];
      account = accounts[0];

    });
  },

};

window.App = App; //either wrap whole code inside this or create const
//front end entry point
window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    ethereum.enable();
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});

function ready(){
  
     var contract = web3.eth.contract(FirstContractfetch.abi).at(FirstContractfetch.address);
        
}
