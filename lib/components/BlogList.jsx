const Link = ReactRouter.Link;
BlogList = React.createClass({
	/**
	 * Format data to DD/MM/YYYY
	 * @param  {object} date 
	 * @return {string} formatted date
	 */
	formatDate(date) {
		return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
	},
	/**
	 * Remove a blog post
	 * @param  {varchar} postId id of the post to remove
	 * @return {boolean} removed blog post successfully
	 */
	removeBlogPost(postId) {
		Meteor.call('removeBlogPost', {_id: postId});
		return true;
	},
	/**
	 * Show admin control tools
	 * @return {jsx} html
	 */
	renderAdminSection(postId) {
		if (Meteor.userId()) {
			return (
				<div className="admin-section">
					<button onClick={this.removeBlogPost.bind(this, postId)} className="removePost btn btn-danger">Remove</button>
				</div>
			);
		}
		return null;
	},
	/**
	 * Get a string version of post body
	 * @param {html} html to be parsed to string 
	 * @return {string}
	 */
	getPostSummary(html) {
		let htmlString = html.toString();
		return htmlString.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 165);
	},
	/**
	 * Render list of recent posts
	 * @param  {array} posts 
	 * @return {html}
	 */
	renderPostList(posts) {
		let self = this;
		if (posts) {
			return posts.map(function(post, index) {
				let postLink = '/blog/' + post.slug;
				return (
					<article key={index} className="blog-item">
						<Link to={postLink}><h3>{post.title}</h3></Link>
		 				<p>{self.formatDate(post.date)}</p>
		 				<p>{self.getPostSummary(post.body)}</p>
						{self.renderAdminSection(post._id)}
		 			</article>
				);
			});
		}
		return <p>Couldn't load posts. Please try again later.</p>;
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
		let content = (!this.props.loading) ? this.renderPostList(this.props.posts) : this.renderLoading();
		return (
			<div className="blog-list">
				<h2>Recent</h2>
				{content}
			</div>
		);
	}
});