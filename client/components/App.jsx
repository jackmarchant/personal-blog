App = React.createClass({
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
