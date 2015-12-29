Meteor.methods({
	'createNewUser': function(newUser) {
		Accounts.createUser({
			email : newUser.email,
			password : newUser.password,
		});
		console.log('created new user');
	}
});