'use strict';
/**                                                                          
 *
 *    ===========================================================================
 *    Aplicacion realizada en NodeJS que se conecta con una red Hyperledger Fabric
 *    ======================
 *    @author Antonio Paya
 *
 */

//==========MODULOS===============
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var rest = require('request');
var RedFabric = require('./modules/redFabric.js');
var mongo = require('./modules/mongo.js');
var fileUpload = require('express-fileupload');
var rest = require('request');
require('dotenv').config();

 
//==========VARIABLES===============
app.set('port', 8081);
app.set('rest',rest);
const redFabric = new RedFabric("user1");

//==========INICIACION=============
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, UPDATE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(fileUpload());
mongo.init();

//==========RUTAS================
require("./routes/routesDatos.js")(app, redFabric, mongo);

//===========RUN===============
// Lanza el servidor
app.listen(app.get('port'), function() {
    console.log("===================================");
    console.log("API -WRITE ");
    console.log("===================================");
    console.log("Autor: Antonio Paya Gonzalez");
    console.log("Servidor activo en el puerto: 8081");
});
