var IndexController = function(){};

IndexController.prototype.getLanding = function(req, res){
	res.send('this is the landing page');
};

module.exports = IndexController;