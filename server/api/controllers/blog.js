var Blog = require('../models/blog');
var Image = require('../models/image');
var Category = require('../models/category');
var fs = require('fs');
var clientDir = process.env.CLIENT_DIR;
var moment = require('moment');
var _ = require('lodash');

var BlogController = function(){};

BlogController.prototype.delete = function(req, res, next){
	// var query = {_id: req.params.id};
	Blog.findByIdAndRemove(req.params.id, function(err, blog){
		if(err) return next(err);
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
	var update = {title: "happy with myself"};
	var options = {new: true};
	Blog.findOneAndUpdate(query, update, options, function(err, blog){
		if(err) return next(err);
		res.status(200).send(blog);
	});
};

BlogController.prototype.getOne = function(req, res, next) {
	Blog.findOne({_id: req.params.id}, function(err, blog){
		if(err) return next(err);
		res.status(200).send(blog);
	});
};



module.exports = BlogController;