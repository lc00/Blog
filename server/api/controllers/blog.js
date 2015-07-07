var Blog = require('../models/blog');

var BlogController = function(){};

BlogController.prototype.add = function(req, res, next){
	var blog = new Blog({
		title: req.body.title,
		content: req.body.content,
		category: req.body.category,
		comment: req.body.comment

	});
	
	blog.save(function(err, blog){
		if(err){
			var errorMessage = 'An error occurred, please try again';	
			return res.send(errorMessage);
		}
		res.send(blog);
	});

};

module.exports = BlogController;