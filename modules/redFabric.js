'use strict';
var fabricClient = require('../config/FabricClient.js');

class RedFabric {

  constructor(user) {
    this.currentUser;
    this.issuer;
    this.userName = user;
    this.connection = fabricClient;
  }

  init() {
    var isUser1 = false;
    if (this.userName == "user1") {
      isUser1 = true;
    }
    return this.connection.initCredentialStores().then(() => {
      return this.connection.getUserContext(this.userName, true)
    }).then((user) => {
      this.issuer = user;
      if (isUser1) {
        return user;
      }
      return this.ping();
    }).then((user) => {
      this.currentUser = user;
      return user;
    })
  }

  queryAllDatos() {
    var tx_id = this.connection.newTransactionID();
    var requestData = {
      chaincodeId: 'mycontract',
      fcn: 'queryAllDatos',
      args: [],
      txId: tx_id
    };
    return this.connection.query(requestData);
  }

  queryDato(id) {
    var tx_id = this.connection.newTransactionID();
    var requestData = {
      chaincodeId: 'mycontract',
      fcn: 'queryDato',
      args: [id],
      txId: tx_id
    };
    return this.connection.query(requestData);
  }

  getDatoHistory(id) {
    var tx_id = this.connection.newTransactionID();
    var requestData = {
      chaincodeId: 'mycontract',
      fcn: 'getDatoHistory',
      args: [id],
      txId: tx_id
    };
    return this.connection.query(requestData);
  }

  deleteDato(id) {
    var tx_id = this.connection.newTransactionID();
    var requestData = {
      chaincodeId: 'mycontract',
      fcn: 'deleteDato',
      args: [id],
      txId: tx_id
    };
    return this.connection.submitTransaction(requestData, tx_id);
  }

  addDato(dato) {
    var tx_id = this.connection.newTransactionID();
    var requestData = {
      chaincodeId: 'mycontract',
      fcn: 'addDato',
      args: [dato.id, dato.temperature, dato.hour, dato.gps, dato.device],
      txId: tx_id
    };
    return this.connection.submitTransaction(requestData, tx_id);
  }

  updateDato(dato) {
    var tx_id = this.connection.newTransactionID();
    var requestData = {
      chaincodeId: 'mycontract',
      fcn: 'updateDato',
      args: [dato.id, dato.temperature, dato.hour, dato.gps, dato.device],
      txId: tx_id
    };
    return this.connection.submitTransaction(requestData, tx_id);
  }

  getLastNum() {
    var tx_id = this.connection.newTransactionID();
    var requestData = {
      chaincodeId: 'mycontract',
      fcn: 'getLastNum',
      args: [],
      txId: tx_id
    };
    return this.connection.query(requestData);
  }

  fantasticQuery(query) {
    var tx_id = this.connection.newTransactionID();
    var requestData = {
      chaincodeId: 'mycontract',
      fcn: 'queryDatoCouchDB',
      args: [query],
      txId: tx_id
    };
    return this.connection.query(requestData);
  }
  
}

module.exports = RedFabric;

