var BlogController = require('../controllers/blog');

var blogController = new BlogController();

var blogRoutes = function(app){
	app.post('/api/v1/blogs', blogController.add);
	app.get('/api/v1/blogs', blogController.getAll);
	app.put('/api/v1/blogs/:id', blogController.update);

	app.get('/api/v1/blogs/latest', blogController.getLatest);
	app.get('/api/v1/blogs/:id', blogController.getOne);
	app.get('/api/v1/blogs/prev/:id', blogController.getPrev);
	app.get('/api/v1/blogs/next/:id', blogController.getNext);
	app.delete('/api/v1/blogs/:id', blogController.delete);



};

module.exports = blogRoutes;