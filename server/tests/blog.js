var supertest = require('supertest');
var should = require('chai').should();
var api = supertest('http://localhost:7000/api/v1/blogs');

describe('POST a blog', function(){
	describe('should succeed', function(){
		it('in adding blog', function(done){
			api.post('')
				.send({
					title: 'fourth blog',
					content: 'contents of the fourth blog',
					imageId: '9923589489034',
					categories: ['fourth', 'blog']
				})
				.expect(201)
				.end(function(err, res){
					if(err) return done(err);
					res.body.title.should.be.equal('fourth blog');
					res.body.content.should.be.equal('contents of the fourth blog');
					res.body.imageId.should.be.equal('9923589489034');
					res.body.categories[0].should.be.equal('fourth');
					res.body.categories[1].should.be.equal('blog');
					res.body.date.should.be.a('string');
					// done is a callback that needs to be called to tell mocha that the 
					// test is finished and move onto the next test
					done();
				});
		});
	});
});

describe('GET All blogs', function(){
	describe('should succeed', function(){
		it('in getting all blogs', function(done){
			api.get('')
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					res.body[2].title.should.be.equal('fourth blog');
					res.body[3].title.should.be.equal('fourth blog');
					done();
				});
		});
	});
});

describe('GET one blog', function(){
	describe('should succeed', function(){
		it('in getting one blog', function(done){
			api.get('/55ad623cd6b831d01a7f2651')
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					res.body.title.should.be.equal('happy with myself');
					done();
				});
		});
	});
});

describe('PUT a blog', function(){
	describe('should succeed', function(){
		it('in updating the blog', function(done){
			api.put('/55ad623cd6b831d01a7f2651')
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					res.body.title.should.be.equal('happy with myself');
					done();
				});
		});
	});
});

// describe('DELETE a blog', function(){
// 	describe('should succeed', function(){
// 		it('in deleting a blog', function(done){
// 			api.delete('/55ad62b4d6b831d01a7f2654')
// 				.expect(200)
// 				.end(function(err, res){
// 					if(err) return done(err);
// 					done();
// 				});
// 		});
// 	});
// });
