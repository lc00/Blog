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
		console.log('*******');
		console.log(req.params.id);
		console.log(blog);
		console.log('deleted a blog with _id: ' + blog._id);
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

BlogController.prototype.getLatest = function(req, res, next){
	// {_id : -1} is for descending order
	Blog.find({$query:{}, $orderby: {_id: -1}}, function(err, results){
		if(err) return next(err);
		res.status(200).send(results[0]);
	});
};

BlogController.prototype.getOne = function(req, res, next) {
	Blog.findOne({_id: req.params.id}, function(err, blog){
		if(err) return next(err);
		res.status(200).send(blog);
	});
};

BlogController.prototype.getNext = function(req, res, next) {
	// {_id : -1} is for descending order
	Blog.find({$query:{}, $orderby: {_id: -1}}, function(err, results){
		if(err) return next(err);
		
		var query = {_id: req.params.id};
		// find the index of this query
		for (var i = 0; i < results.length; i++) {
			if(results[i]._id == req.params.id ) {
				return res.status(200).send(results[i+1]);
			}
		};
		res.status(404).send('problem with finding/getting the next blog');
	});
};

BlogController.prototype.getPrev= function(req, res, next) {
	// {_id : -1} is for descending order
	Blog.find({$query:{}, $orderby: {_id: -1}}, function(err, results){
		if(err) return next(err);
		
		var query = {_id: req.params.id};
		// find the index of this query
		for (var i = 0; i < results.length; i++) {
			if(results[i]._id == req.params.id ) {
				return res.status(200).send(results[i-1]);
			}
		};
		res.status(404).send('problem with finding/getting the previous blog');
	});
};

module.exports = BlogController;