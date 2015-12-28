Blog = React.createClass({
	render() {
		return (
			<div className="container blog">
				{this.props.children || <BlogList />}
			</div>
		);
	}
});