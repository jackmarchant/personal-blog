App = React.createClass({
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
