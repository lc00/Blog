var mongoose = require('mongoose');

var blogSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	picture: String,
	category: [String],
	date: {
		type: Date,
		default: function(){
			return new Date();
		}
	},
	comment: String

});

var Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;