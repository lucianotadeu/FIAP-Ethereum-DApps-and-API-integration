// Source code to interact with smart contract

//connection with node
if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }

// Variáveis preenchidas a partir da publicação do contrato
var contractAddress = '0xA4ceDb7277BaEC50e0445d65BD84869E666fBb18';
var abi = JSON.parse( '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]' );


//baseContract = web3.eth.contract(abi);
//contract = baseContract.at(contractAddress);
contract = new web3.eth.Contract(abi, contractAddress);

// Busca contas
web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
        alert("Ocorreu um erro ao buscar suas contas.");
        return;
    }

    if (accs.length == 0) {
        alert("Nenhuma conta encontrada! Verifique se o Ethereum client está configurado corretamente.");
        return;
    }

    accounts = accs;
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
});


function getName(){
    contract.methods.name().call().then( ( info )=>  { 
        console.log( "info: ", info ) 
        document.getElementById('tokenName').innerHTML = info;
    });
}

function getDecimals(){
  contract.methods.decimals().call().then( ( info )=>  { 
      console.log( "info: ", info ) 
      document.getElementById('tokenDecimals').innerHTML = info;
  });
}
function getSymbol(){
  contract.methods.symbol().call().then( ( info )=>  { 
      console.log( "info: ", info ) 
      document.getElementById('tokenSymbol').innerHTML = info;
  });
}
function getTotalSupply(){
  contract.methods.totalSupply().call().then( ( info )=>  { 
      console.log( "info: ", info ) 
      document.getElementById('tokenTotalSupply').innerHTML = info;
  });
}

function getAllowance(owner, spender){
    contract.methods.allowance(owner, spender).call().then( ( info )=>  { 
        console.log( "info: ", info ) 
        document.getElementById('allowedValue').innerHTML = info;
    });
}
function getBalanceOf(address){
    contract.methods.balanceOf(address).call().then( ( info )=>  { 
        console.log( "info: ", info ) 
        document.getElementById('balanceValue').innerHTML = info;
    });
}

function setMintTo(address, value) {
    contract.methods.mint(address, value).send( {from: account}).then( (tx) => { 
      ModalDialog("Mint", "Mint sucessful! <br /> <br /> Transaction: " + tx.transactionHash );
      document.getElementById('value').value = '';
    }).catch( ( error ) =>{
      ModalDialog("Mint", "Mint ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
      console.log( "ERRO: ", error ); 
      }
    );
}
function setApprove(spender, value) {
    contract.methods.approve(spender, value).send( {from: account}).then( (tx) => { 
        console.log( "Transaction: ", tx ); 
    }).catch( ( error ) =>{
      ModalDialog("setApprove", "Mint ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
      console.log( "ERRO: ", error ); 
      }
    );
    document.getElementById('value').value = '';
}
function SetDecreaseAllowance(spender, value) {
    contract.methods.increaseAllowance(spender, value).send( {from: account}).then( (tx) => { 
        console.log( "Transaction: ", tx ); 
    }).catch( ( error ) =>{
      ModalDialog("SetDecreaseAllowance", "Mint ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
      console.log( "ERRO: ", error ); 
      }
    );
    document.getElementById('value').value = '';
}
function SetIncreaseAllowance(spender, value) {
    contract.methods.decreaseAllowance(spender, value).send( {from: account}).then( (tx) => { 
        console.log( "Transaction: ", tx ); 
    }).catch( ( error ) =>{
      ModalDialog("SetIncreaseAllowance", "Mint ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
      console.log( "ERRO: ", error ); 
      }
    );
    document.getElementById('value').value = '';
}
function SetTransfer(to, value) {
    contract.methods.transfer(to, value).send( {from: account}).then( (tx) => { 
        console.log( "Transaction: ", tx ); 
    }).catch( ( error ) =>{
      ModalDialog("SetTransfer", "Mint ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
      console.log( "ERRO: ", error ); 
      }
    );
    document.getElementById('value').value = '';
}
function SetTransferFrom(from, to, value) {
    contract.methods.transferFrom(from, to, value).send( {from: account}).then( (tx) => { 
        console.log( "Transaction: ", tx ); 
    }).catch( ( error ) =>{
      ModalDialog("SetTransferFrom", "Mint ERROR! <br /> <br /> Code:" + error.code + "<br />" + error.message );
      console.log( "ERRO: ", error ); 
      }
    );
    document.getElementById('value').value = '';
}

function ModalDialog(titulo, texto) {
  var random = Math.random().toString().replace('.', '');
  var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
      '        <div class="modal-dialog">                                                                                 ' +
      '            <div class="modal-content">                                                                            ' +
      '                <div class="modal-header">                                                                         ' +
      '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
      '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
      '                </div>                                                                                             ' +
      '                <div class="modal-body">                                                                           ' +
      '                    <p>' + texto + '</p>                                                                           ' +
      '                </div>                                                                                             ' +
      '                <div class="modal-footer">                                                                         ' +
      '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
      '                                                                                                                   ' +
      '                </div>                                                                                             ' +
      '            </div><!-- /.modal-content -->                                                                         ' +
      '  </div><!-- /.modal-dialog -->                                                                                    ' +
      '</div> <!-- /.modal -->                                                                                        ';

  $('body').append(texto);
  $('#' + random).modal('show');
}

function addressValid(address){
  if(!web3.utils.isAddress(address)){
    ModalDialog("Address invalid", "Address " + address + " is invalid!");
    return false;
  }
  return true;
}

function valueValid(value){
  if(value < 1){
    ModalDialog("Value invalid", "Value precisa ser maior que zero");
    return false;
  }
  return true;
}

