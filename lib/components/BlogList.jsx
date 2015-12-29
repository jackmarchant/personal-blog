const Link = ReactRouter.Link;
BlogList = React.createClass({
	
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
	 * Format data to DD/MM/YYYY
	 * @param  {object} date 
	 * @return {string} formatted date
	 */
	formatDate(date) {
		return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
	},
	
	/**
	 * Render list of recent posts
	 * @param  {array} posts 
	 * @return {html}
	 */
	renderPostList(posts) {
		let self = this;
		return posts.map(function(post, index) {
			let postLink = '/blog/' + post._id;
			return (
				<article key={index} className="blog-item">
					<Link to={postLink}><h3>{post.title}</h3></Link>
	 				<p>{self.formatDate(post.date)}</p>
	 				<p>{post.body}</p>
	 			</article>
			);
		});
	},
	/**
	 * Render html showing data loading state
	 * @return {jsx}
	 */
	renderLoading() {
		return (
			<p>Loading posts...</p>
		);
	},
	/**
	 * Render this component
	 * @return {html}
	 */
	render() {
		let content = (!this.data.postsLoading) ? this.renderPostList(this.data.posts) : this.renderLoading();
		return (
			<div className="blog-list">
				<h2>Recent</h2>
				{content}
			</div>
		);
	}
});