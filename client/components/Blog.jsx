Blog = React.createClass({
	render() {
		return (
			<div className="container blog position-center">
				{this.props.children || <BlogList />}
			</div>
		);
	}
});