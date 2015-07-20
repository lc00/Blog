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
	imageId: String,
	categories: [String],
	date: {
		type: Date,
		default: function(){
			return new Date();
		}
	}
});


var Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;