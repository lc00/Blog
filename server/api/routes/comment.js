var CommentController = require('../controllers/comment');

var commentController = new CommentController();

var commentRoutes = function(app){
	app.post('/api/v1/comments', commentController.add);
	app.get('/api/v1/comments', commentController.getAll);
	app.get('/api/v1/comments/:id', commentController.getOne);
	app.put('/api/v1/comments/:id', commentController.update);
	app.delete('/api/v1/comments/:id', commentController.delete);

};

module.exports = commentRoutes;