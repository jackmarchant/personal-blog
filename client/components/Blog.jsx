Blog = React.createClass({
	/**
	 * Render this component
	 * @return {jsx}
	 */
	render() {
		return (
			<div className="container blog position-center">
				{this.props.children || <BlogList />}
			</div>
		);
	}
});