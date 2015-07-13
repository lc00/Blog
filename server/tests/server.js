var supertest = require('supertest');
var should = require('chai').should();
// var expect = require('chai').expect();
var api = supertest('http://localhost:7000/api/v1');

describe('send user login information', function(){
	describe('should succeed', function(){
		it('in logging in', function(done){
		api.post('/users/login')
			.send({
				username: 'a',
				password: 'a'
			})
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				res.body.username.should.be.equal('a');
				done();
			});
		});
	});

});

