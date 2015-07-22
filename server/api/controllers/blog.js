var Blog = require('../models/blog');
var Image = require('../models/image');
var Category = require('../models/category');
var fs = require('fs');
var clientDir = process.env.CLIENT_DIR;
var moment = require('moment');

var BlogController = function(){};



BlogController.prototype.add = function(req, res, next){
	// iterate through to check req.body.categories
	// if item is not in category collection, create a category document

// var callback = function(err){
// 	if(err) return re.status(500).send(err);
// 	res.send('successfully created a new category');
// };
// var recursion = function(err, array, cb){
// 	if(err) return cb(err);
// 	if(array.length === 0) return cb();
// 	var categoryName = array.shift();
// 	Category.findById(categoryName, function(err){
// 		if(err) {
// 			console.log(err);
// 			var category = new Category({
// 				_id: categoryName
// 			});
// 			category.save(function(err){
// 				console.log('inside saving category');
// 				if(err) {
// 					var errorMessage = 'An error occurred, please try again';	
// 					return recursion(err);
// 				}
// 				recursion(null, array, cb);
// 			});
		
// 		}


// 	});

// };


// 	recursion(null, req.body.categories, callback);


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

BlogController.prototype.getOne = function(req, res, next) {
	Blog.findOne({_id: req.params.id}, function(err, blog){
		if(err) return next(err);
		res.status(200).send(blog);
	});
};

BlogController.prototype.update = function(req, res, next){
	var query = {_id: req.params.id};
	var update = {title: req.body.title};
	var options = {new: true};
	Blog.findOneAndUpdate(query, update, options, function(err, blog){
		if(err) return next(err);
		res.status(200).send(blog);
	});
};

BlogController.prototype.delete = function(req, res, next){
	Blog.findByIdAndRemove(req.params.id, function(err, blog){
		if(err) return next(err);
		res.sendStatus(200);
	});
};


module.exports = BlogController;