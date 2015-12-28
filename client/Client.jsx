// React Router dependencies
const {Router, Route} = ReactRouter;
const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)();
Link = ReactRouter.Link;
const DefaultRoute = ReactRouter.DefaultRoute;

Meteor.subscribe('posts');

// startup meteor page
Meteor.startup(function () {
  // Use Meteor.startup to render the component after the page is ready
  ReactDOM.render((
    <Router history={history}>
      <Route path="/" component={App}>
		<Route path="/blog" component={Blog}>
			<Route path="/blog/:post" component={BlogItem} />
		</Route>
      </Route>
    </Router>
  ), document.getElementById('app-container'));
});