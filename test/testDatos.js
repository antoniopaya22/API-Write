let chai = require('chai');
let mocha = require('mocha');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let RedFabric = require('../modules/redFabric');
const redFabric = new RedFabric("user1");
let should = chai.should();

chai.use(chaiHttp);
const url= 'http://localhost:8081/api';

mocha.describe('CRUD Datos tests: ',function () {
	this.timeout(5000);

	it('Añadir un nuevo dato.', (done) => {
		var date = new Date().getMilliseconds().toString();
		chai.request(url)
			.post('/dato')
			.send({temperature:"10", hour: date, device: "test", gps: "-12.954811916515027;-5.344964478190036"})
			.end( function(err,res){
				console.log(res.body);
				expect(res).to.have.status(200);
				done();
			});
	});

	it('Eliminar un dato existente.', (done) => {
		redFabric.init().then(function (){
			return redFabric.getLastNum()
		}).then(function (data) {
			chai.request(url)
			.delete('/dato/ID_AS'+(parseInt(data.Num)-1))
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
		}).catch(function (err) {
			console.log(err);
		});
	});

	it('Eliminar un dato no existente.', (done) => {
		redFabric.init().then(function (){
			return redFabric.getLastNum()
		}).then(function (data) {
			chai.request(url)
			.delete('/dato/XXXX')
			.end( function(err,res){
				expect(res).to.have.status(500);
				done();
			});
		}).catch(function (err) {
			console.log(err);
		});
	});

	it('Actualizar un dato existente', (done) => {
		var date = new Date().getMilliseconds().toString();
		chai.request(url)
			.put('/dato/ID_PRUEBA_0')
			.send({temperature:"10", hour: date, device: "test", gps: "-12.954811916515027;-5.344964478190036"})
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});
	
	it('Actualizar un dato no existente', (done) => {
		var date = new Date().getMilliseconds().toString();
		chai.request(url)
			.put('/dato/ID_PRUEBA_X')
			.send({temperature:"10", hour: date, device: "test", gps: "-12.954811916515027;-5.344964478190036"})
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(500);
				done();
			});
	});

	it('Obtener todos los datos', (done) => {
		chai.request(url)
			.get('/datos')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
			done();
			});
	});

	it('Buscar un dato no existente por su id', (done) => {
		chai.request(url)
			.get('/dato/XXX')
			.end((err, res) => {
				res.should.have.status(500);
			done();
			});
	});

	it('Obtener resultado para una consulta CouchDB', (done) => {
		var query = {
			"selector": {
				"_id" : "ID_PRUEBA_0"
			}
		}		
		chai.request(url)
			.post('/query')
			.send(query)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(1);
			done();
			});
	});
    
});
