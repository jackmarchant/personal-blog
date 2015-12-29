Meteor.startup(function() {
	Meteor.methods({
		'createBlogPost': function(newBlogPost) {
			Posts.insert({
				title: newBlogPost.title,
				body: newBlogPost.body,
				date: new Date(),
			});
			console.log('created new post');
		},
		'createNewUser': function(newUser) {
			Accounts.createUser({
				email : newUser.email,
				password : newUser.password,
			});
		}
	});
});