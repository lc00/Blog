var BlogController = require('../controllers/blog');

var blogController = new BlogController();

var blogRoutes = function(app){
	app.post('/api/v1/blogs', blogController.add);
};

module.exports = blogRoutes;