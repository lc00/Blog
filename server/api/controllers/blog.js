var Blog = require('../models/blog');
var Image = require('../models/image');
var fs = require('fs');
var clientDir = process.env.CLIENT_DIR;

var BlogController = function(){};

BlogController.prototype.add = function(req, res, next){
	// __dirname is the current directory
	var imgPath = __dirname + '/../../../client/' + clientDir + '/images/photography-shane-hawk-05.jpg';
	var image = new Image({
		"img.data": fs.readFileSync(imgPath),
		"img.contentType": 'image/jpg'
	});

console.log(image);
	image.save(function(err, image){
		if(err) return err;
		console.log('saved image');
	});

	var blog = new Blog({
		title: req.body.title,
		content: req.body.content,
		picture: image._id,
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