var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		unique: false
	},
	token: {
		type: String
	},
	tokenCreatedTime: {
		type: Number
	}		

});

/**
 * This allows us to hook into the pre-save DB flow. Our
 * callback will be called whenever a new user is about to
 * be saved to the database so that we can encrypt the password.
 */
userSchema.pre('save', function(next){

  // First, check to see if the password has been modified. If not, just move on.
  if(!this.isModified('password')) return next();

  // Store access to "this", which represents the current user document
  var user = this;

  bcrypt.genSalt(10, function(err, salt){

    // If there was an error, allow execution to move to the next middleware
		if(err) return next(err);

    // If we are successful, use the salt to run the encryption on the given password
  	bcrypt.hash(user.password, salt, function(err, hash){

    // If there was an error, allow execution to move to the next middleware
		if(err) return next(err);

		// If the encryption succeeded, then replace the un-encrypted password
    // in the given document with the newly encrypted one.
		user.password = hash;

		// Allow execution to move to the next middleware.
		return next();
  	});
  });
});

	
userSchema.methods.comparePassword = function(candidatePassword, next){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		
		if(err) return next(err);

    // If there is no error, move to the next middleware and inform
    // it of the match status (true or false)
		return next(null, isMatch);

	});
};

// Our user model
var User = mongoose.model('user',userSchema);

module.exports = User;