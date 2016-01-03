// Individual post only
BlogItem = React.createClass({
	// Meteor data
	mixins: [ReactMeteorData],
	
	/**
	 * Meteor Data
	 * @return {object} from Meteor Mongo 
	 */
	getMeteorData() {
		let handle = Meteor.subscribe('posts');
	    return {
	      post: Posts.findOne({'slug': this.props.params.slug}),
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
						<div dangerouslySetInnerHTML={{__html: post.body}} />
		 			</article>
		 			<Link to="/blog" className="btn btn-info">All Posts</Link>
		 		</div>
			);
		} return <div>Couldn't find post</div>;
	}
});