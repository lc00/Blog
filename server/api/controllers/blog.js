var Blog = require('../models/blog');
var Image = require('../models/image');
var Category = require('../models/category');
var fs = require('fs');
var clientDir = process.env.CLIENT_DIR;

var BlogController = function(){};

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

module.exports = BlogController;