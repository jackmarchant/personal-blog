// both client and server js
const {IndexRoute, Route} = ReactRouter;
if (Meteor.isClient) {
	// history requires the DOM
	const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)();
}
Link = ReactRouter.Link;
const DefaultRoute = ReactRouter.DefaultRoute;
AppRoutes = (
		<Route path="/" component={App}>
			<Route path="/blog" component={Blog}>
				<Route path="/blog/:slug" component={BlogItem} />
			</Route>
			<Route path="/admin" component={Admin}>
				<Route path="/admin/add-new-post" component={AddNewPost} />
			</Route>
		</Route>
);

ReactRouterSSR.Run(AppRoutes);
