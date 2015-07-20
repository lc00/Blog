var BlogController = require('../controllers/blog');

var blogController = new BlogController();

var blogRoutes = function(app){
	app.post('/api/v1/blogs', blogController.add);
	app.get('/api/v1/blogs', blogController.getAll);
	// app.get('/api/v1/blogs/:id', blogController.get);
	app.put('/api/v1/blogs/:id', blogController.update);
	// app.delete('/api/v1/blogs', blogController.delete);

	app.delete('/api/v1/blogs/all', blogController.deleteAll);

	// get the latest blog
	app.get('/api/v1/blogs/latest', blogController.getLatest);



};

module.exports = blogRoutes;