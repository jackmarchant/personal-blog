Meteor.startup(function() {
	Meteor.methods({
		'createBlogPost': function(newBlogPost) {
			Posts.insert({
				title: newBlogPost.title,
				body: newBlogPost.body,
				date: new Date(),
				slug: helperMethods.createSlug(newBlogPost.title),
			});
		},
		'createNewUser': function(newUser) {
			Accounts.createUser({
				email : newUser.email,
				password : newUser.password,
			});
		}
	});
});

helperMethods = {
	createSlug(title) {
		return title
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
	}
}