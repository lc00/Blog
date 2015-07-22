var Comment = require('../models/comment');

var CommentController = function(){};

CommentController.prototype.add = function(req, res, next){
	var comment = new Comment({
		text: req.body.text,
		user: req.body.user,
		blog: req.body.blog
	});

	comment.save(function(err, comment){
		if(err) return next(err);
		res.status(201).send(comment);
	});
};

CommentController.prototype.getAll = function(req, res, next) {
	Comment.find({}, function(err, comments){
		if(err) return next(err);
		res.status(200).send(comments);
	});
};

CommentController.prototype.getOne = function(req, res, next){
	Comment.findById(req.params.id, function(err, comment){
		if(err) return next(err);
		res.status(200).send(comment);
	});
};

CommentController.prototype.update = function(req, res, next){
	var query = {_id: req.params.id};
	var update = {text: req.body.text};
	var options = {new: true};
	Comment.findOneAndUpdate(query, update, options, function(err, comment){
		if(err) return next(err);
		res.status(200).send(comment);
	});
};

CommentController.prototype.delete = function(req, res, next){
	Comment.findByIdAndRemove(req.params.id, function(err, comment){
		if(err) return next(err);
		res.sendStatus(200);
	});
};

module.exports = CommentController;