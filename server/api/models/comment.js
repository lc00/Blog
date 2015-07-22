var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	text: String,
	user: String,
	blog: String
});

var Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;