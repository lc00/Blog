var Blog = require('../models/blog');
var Image = require('../models/image');
var Category = require('../models/category');
var fs = require('fs');
var clientDir = process.env.CLIENT_DIR;
var moment = require('moment');

var BlogController = function(){};

BlogController.prototype.deleteAll = function(req, res, next){
	Blog.remove({}, function(err){
		if(err) return next(err);
		console.log('deleted all blogs');
		res.sendStatus(200);
	});
};

BlogController.prototype.add = function(req, res, next){
	var blog = new Blog({
		title: req.body.title,
		content: req.body.content,
		imageId: req.body.imageId,
		categories: req.body.categories
		// comments: req.body.comments

	});
	
	blog.save(function(err, blog){
		if(err){
			var errorMessage = 'An error occurred, please try again';	
			return res.status(500).send(errorMessage);
		}
		res.status(201).send(blog); // 201 is the status for created successfully
	});

};

BlogController.prototype.getAll = function(req, res, next){
	Blog.find({}, function(err, blogs){
		if(err) {
			var errorMessage = 'An error occurred, please try again';	
			return res.status(500).send(errorMessage);
		}
		res.status(200).send(blogs);
	});
};

BlogController.prototype.update = function(req, res, next){
	var query = {_id: req.params.id};
	var update = {title: "updated fourth blog"};
	var options = {new: true};
	Blog.findOneAndUpdate(query, update, options, function(err, blog){
		if(err) return next(err);
		// console.log(blog);
		res.status(200).send(blog);
	});
};

BlogController.prototype.getLatest = function(req, res, next){
	Blog.find({$query:{}, $orderby: {_id: -1}}, function(err, results){
		if(err) return next(err);
		res.status(200).send(results[0]);
	});
};



module.exports = BlogController;