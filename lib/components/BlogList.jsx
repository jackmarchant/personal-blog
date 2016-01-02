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
	 * Render list of recent posts
	 * @param  {array} posts 
	 * @return {html}
	 */
	renderPostList(posts) {
		let self = this;
		if (posts) {
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