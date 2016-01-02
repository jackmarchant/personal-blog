App = React.createClass({
	// componentWillMount() {
	// 	if (Meteor.isClient) {
	// 		return false;
	// 	}
	// },
	/**
	 * Render this component
	 * @return {jsx}
	 */
	render() {
		return (
			<div className="wrapper">
				<Header />
				<Navigation />
					{this.props.children || <HomeContent />}
				<Footer />
			</div>
		);
	}
});
