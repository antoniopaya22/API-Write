let chai = require('chai');
let mocha = require('mocha');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let RedFabric = require('../modules/redFabric');
const redFabric = new RedFabric("user1");
let should = chai.should();

chai.use(chaiHttp);
const url= 'http://localhost:8081/api';

mocha.describe('Add dato and delete dato: ',function () {
	this.timeout(5000);

	it('Deberia crear el dato', (done) => {
		var date = new Date().getMilliseconds().toString();
		chai.request(url)
			.post('/dato')
			.send({temperature:"10", hour: date, device: "test", gps: "11111;1111111"})
			.end( function(err,res){
				console.log(res.body);
				expect(res).to.have.status(200);
				done();
			});
	});

	it('Deberia eliminar el dato', (done) => {
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
});

mocha.describe('Put dato: ',function (){
    this.timeout(5000);
	it('put a data', (done) => {
		chai.request(url)
			.put('/dato/ID_PRUEBA_0')
			.send({temperature:"10", hour: "11:11", device: "test", gps: "11111;1111111"})
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
    });
    
    it('error at put a data', (done) => {
		chai.request(url)
			.put('/dato/ID_PRUEBA_X')
			.send({temperature:"10", hour: "11:11", device: "test", gps: "11111;1111111"})
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(500);
				done();
			});
	});
  
});

mocha.describe('get all', function () {
	this.timeout(5000);
	it('Deberia devolver todos los datos', (done) => {
		chai.request(url)
			.get('/datos')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
			done();
			});
	});
});

mocha.describe('get id', function () {
	this.timeout(5000);
	it('Deberia devolver el ID_PRUEBA_0', (done) => {
		chai.request(url)
			.get('/dato/ID_PRUEBA_0')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('temperature');
				res.body.should.have.property('device');
				res.body.should.have.property('gps');
				res.body.should.have.property('hour');
				res.body.should.have.property('node');
			done();
			});
	});
});

mocha.describe('get id', function () {
	this.timeout(5000);
	it('Deberia devolver el ID_PRUEBA_0', (done) => {
		chai.request(url)
			.get('/dato/ID_PRUEBA_0')
			.end((err, res) => {
				res.should.have.status(200);
			done();
			});
	});
});