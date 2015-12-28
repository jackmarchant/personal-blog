const Link = ReactRouter.Link;
BlogList = React.createClass({
	// Meteor data
	mixins: [ReactMeteorData],

	/**
	 * Get data from meteor database
	 * @return {object} meteor data accessed through this.data
	 */
	getMeteorData() {
		// Posts.insert({
		//   date: new Date(),
		//   title: "My second post!",
		//   body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus magnam, vel numquam eligendi suscipit voluptatum asperiores consequuntur totam, distinctio soluta ex sit voluptate dolorum modi nam. Accusantium reiciendis quas repellendus."
		// });
		return {
			posts: Posts.find({}, {sort: {date: -1}}).fetch(),
		}
	},
	
	formatDate(date) {
		return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
	},

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
	render() {
		return (
			<div className="blog-list">
				<h2>Recent</h2>
				{this.renderPostList(this.data.posts)}
			</div>
		);
	}
});