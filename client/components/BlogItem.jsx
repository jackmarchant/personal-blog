BlogItem = React.createClass({
	// Meteor data
	mixins: [ReactMeteorData],
	
	/**
	 * Meteor Data
	 * @return {object} from Meteor Mongo 
	 */
	getMeteorData() {
	    return {
	      post: Posts.findOne(this.props.params.post),
	    };
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
	 * Render component
	 * @return {object} html
	 */
	render() {
		let post = this.data.post;
		if (post) {
			return (
				<div className="post-wrapper">
					<article className="blog-post">
						<h3>{post.title}</h3>
						<p>{this.formatDate(post.date)}</p>
						<p>{post.body}</p>
		 			</article>
		 			<Link to="/blog">All Posts</Link>
		 		</div>
			);
		} return <div>Couldn't find post</div>;
	}
});