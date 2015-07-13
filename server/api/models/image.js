var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
	img: {
		data: Buffer,
		contentType: String
	},
	position: {
		type: String,
		default: 'left'
	}
});
var Image = mongoose.model('image', imageSchema);
module.exports = Image;
