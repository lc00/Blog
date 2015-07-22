var supertest = require('supertest');
var should = require('chai').should();
// var expect = require('chai').expect();
var api = supertest('http://localhost:7000/api/v1/users');

var random = Math.random();
console.log(random);

describe('POST user sign-up', function(){
	describe('should succeed', function(){
		it('in signing up', function(done){
			api.post('')
				.send({
					username: 'b' + random,
					email: 'b' + random + '@b.com',
					password: 'b' + random
				})
				.expect(201)
				.end(function(err, res){
					if(err) return done(err);
					res.body.username.should.be.equal('b' + random);
					res.body.email.should.be.equal('b' + random + '@b.com');					
					done();
				});

		});
	});
});

describe('POST user login information', function(){
	describe('should succeed', function(){
		it('in logging in', function(done){
			api.post('/login')
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

// describe('POST user logout information', function(){
// 	describe('should succeed', function(){
// 		it('in logging out', function(done){
// 			api.post('/logout')
// 				.send({
// 					username: 'a',
// 					password: 'a'
// 				})
// 				.expect(200)
// 				.end(function(err, res){
// 					if(err) return done(err);
// 					res.body.username.should.be.equal('a');
// 					done();
// 				});
// 		});
// 	});

// });


