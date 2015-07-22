var supertest = require('supertest');
var should = require('chai').should();
var api = supertest('http://localhost:7000/api/v1/comments');

describe('POST a comment', function(){
	describe('should succeed', function(){
		it('in adding the first comment', function(done){
			api.post('')
				.send({
					text: 'coolsome article',
					user: '55aff254b8b030841bb82f67',
					blog: '55afde1bf77712650f379f62'
				})
				.expect(201)
				.end(function(err, res){
					if(err) return done(err);
					res.body.text.should.be.equal('coolsome article');
					res.body.user.should.be.a('string');
					res.body.blog.should.be.a('string');
					// done is a callback that needs to be called to tell mocha that the 
					// test is finished and move onto the next test
					done();
				});
		});
	});
});
  
describe('GET All comments', function(){
	describe('should succeed', function(){
		it('in getting all comments', function(done){
			api.get('')
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					res.body[0].text.should.be.equal('coolsome article');
					res.body[1].text.should.be.equal('coolsome article');
					done();
				});
		});
	});
});

describe('GET one comment', function(){
	describe('should succeed', function(){
		it('in getting one comment', function(done){
			api.get('/55b00d16b7abdc9c1f33b4c0')
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					res.body.text.should.be.equal('coolsome article');
					done();
				});
		});
	});
});

describe('PUT one comment', function(){
	describe('should succeed', function(){
		it('in updating one comment', function(done){
			api.put('/55b00fdf9aa1e705209350a5')
				.send({
					text: 'interesting!'
				})
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					res.body.text.should.be.equal('interesting!');
					done();
				});
		});
	});
});


// describe('DELETE one comment', function(){
// 	describe('should succeed', function(){
// 		it('in deleting one comment', function(done){
// 			api.delete('/55b0106fc5b695122053dbec')
// 				.expect(200)
// 				.end(function(err, res){
// 					if(err) return done(err);
// 					done();
// 				});
// 		});
// 	});
// });

