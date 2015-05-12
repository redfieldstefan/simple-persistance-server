'use-strict';

require('../server');

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

describe('Rant REST api, get and post requests', function() {

	it('Should get an array of Rant files', function(done){
		chai.request('localhost:3000/')
			.get('api/rants')
			.end(function(err, res) {
				expect(err).eql(null);
				expect(typeof res.body).to.eql('object');
				expect(Array.isArray(res.body)).to.eql(true);
				done();
			});
	});

	it('Should create a Rant object', function(done){
		chai.request('localhost:3000/')
			.post('api/rants')
			.send({title: 'Test', rant: 'Test rant'})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('new file written');
				done();
			});
	});
});

describe('Needs Rants to alter', function() {

	beforeEach(function(done) {
		var rantTest = {
			title: 'test',
			rant: 'test'
		}
		done();
	}); 

	it('should replace a Rant', function(done){
		chai.request('localhost:3000')
			.put('/api/rants/:id')
			.send({title: 'New Title', rant: 'Tests are great'})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('put request complete');
				done();
			});	
	});

	it('should update a Rant', function(done){
		chai.request('localhost:3000')
			.patch('/api/rants/:id')
			.send({title: 'New Title', rant: 'Tests are more than great'})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('patch request complete');
				done();
			});	
	});

	it('should delete a Rant', function(done){
		chai.request('localhost:3000')
			.delete('/api/rants/:id')
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('delete request complete');
				done();
			});	
	});

});
