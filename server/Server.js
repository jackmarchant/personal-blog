'use strict';
Meteor.startup(function() {
	Meteor.methods({
		'createBlogPost': function(newBlogPost) {
			Posts.insert({
				title: newBlogPost.title,
				body: helperMethods.convertMarkdown(newBlogPost.body),
				date: new Date(),
				slug: helperMethods.createSlug(newBlogPost.title),
			});
		},
		'removeBlogPost': function(post) {
			Posts.remove(post._id);
		},
		'createNewUser': function(newUser) {
			Accounts.createUser({
				email : newUser.email,
				password : newUser.password,
			});
		},
	});
});

const helperMethods = {
	createSlug(title) {
		return title
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
	},
	convertMarkdown(markdown) {
		let marked = Meteor.npmRequire('marked');
		marked.setOptions({
		  renderer: new marked.Renderer(),
		  gfm: true,
		  tables: true,
		  breaks: false,
		  pedantic: false,
		  sanitize: true,
		  smartLists: true,
		  smartypants: false
		});
		return marked(markdown);
	}
}