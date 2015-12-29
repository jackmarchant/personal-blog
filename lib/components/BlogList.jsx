const Link = ReactRouter.Link;
BlogList = React.createClass({
	
	// Meteor data
	mixins: [ReactMeteorData],

	/**
	 * Get data from meteor database
	 * @return {object} meteor data accessed through this.data
	 */
	getMeteorData() {
		return {
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
	 * Render this component
	 * @return {html}
	 */
	render() {
		return (
			<div className="blog-list">
				<h2>Recent</h2>
				{this.renderPostList(this.data.posts)}
			</div>
		);
	}
});