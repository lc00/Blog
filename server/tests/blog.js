var supertest = require('supertest');
var should = require('chai').should();
var api = supertest('http://localhost:7000/api/v1');

describe('add blog', function(){
	describe('should succeed', function(){
		it('in adding blog', function(done){
			api.post('/blog/add')
				.send({
					title: 'first blog',
					content: 'contents of the first blog'
				})
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					res.body.title.should.be.equal('first blog');
					done();
				});
		});
	});
});
