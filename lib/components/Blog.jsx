Blog = React.createClass({
	
	// Meteor data
	mixins: [ReactMeteorData],

	/**
	 * Get data from meteor database
	 * @return {object} meteor data accessed through this.data
	 */
	getMeteorData() {
		let handle = Meteor.subscribe('posts');
		return {
			postsLoading: ! handle.ready(),
			posts: Posts.find({}, {sort: {date: -1}}).fetch(),
		}
	},

	/**
	 * Render this component
	 * @return {jsx}
	 */
	render() {
		return (
			<div className="container blog position-center">
				{this.props.children || <BlogList posts={this.data.posts} loading={this.data.postsLoading}/>}
			</div>
		);
	}
});