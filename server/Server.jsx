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

const {Router, Route} = ReactRouter;
const Link = ReactRouter.Link;
const DefaultRoute = ReactRouter.DefaultRoute;
App = React.createClass({
	render() {
		return (
			<div id="app-container">
				<div id="header-main">
					<h1 className="text-center">Jack Marchant</h1>
					<h4 className="text-center">Web Developer</h4>
				</div>
				<div className="container home-content">
					<h3>Ramblings of a developer</h3>
					<p>Hi! My name is Jack, I'm a developer from Sydney, Australia.</p>
					<p>I can't get enough of programming for the web. JavaScript is what I'm interested in right now. So I've been writing a lot of JavaScript (React especially)</p>
				</div>
				<div id="footer-main" className="container text-center">
					<p>Created with <a href="http://facebook.github.io/react/" target="_blank">ReactJS</a> by Jack Marchant</p>
				</div>
			</div>
		);
	}
});
AppRoutes = (
  <Router>
	  <Route path="/" component={App}>
	  </Route>
  </Router>
);
ReactRouterSSR.Run(AppRoutes);

