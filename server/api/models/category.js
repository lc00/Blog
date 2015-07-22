var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
	_id: String
});

var Category = mongoose.model('category', categorySchema);

module.exports = Category;