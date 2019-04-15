let chai = require('chai');
let mocha = require('mocha');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let RedFabric = require('../modules/redFabric');
const redFabric = new RedFabric("user1");
let should = chai.should();

chai.use(chaiHttp);
const url= 'http://localhost:8081/api';

mocha.describe('Prueba a crear un dato y después eliminarlo: ',function () {
	this.timeout(5000);

	it('Add dato', (done) => {
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

	it('Delete dato', (done) => {
		redFabric.init().then(function (){
			return redFabric.getLastNum()
		}).then(function (data) {
			chai.request(url)
			.delete('/dato/ID_BRA'+(parseInt(data.Num)-1))
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
		}).catch(function (err) {
			console.log(err);
		});
	});
});

mocha.describe('Prueba a actualizar el dato ID_PRUEBA_0 y después prueba a actualizar un dato inexistente: ',function (){
    this.timeout(5000);
	it('Update dato', (done) => {
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
    
    it('Wrong update dato', (done) => {
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
  
});

mocha.describe('Prueba a obtener todos los datos', function () {
	this.timeout(5000);
	it('Get all data', (done) => {
		chai.request(url)
			.get('/datos')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
			done();
			});
	});
});

mocha.describe('Prueba a obtener un dato con id ID_PRUEBA_0', function () {
	this.timeout(5000);
	it('Get by id', (done) => {
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

mocha.describe('Prueba a obtener un dato mediante una query', function () {
	this.timeout(5000);
	it('Deberia devolver el ID_PRUEBA_0', (done) => {
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