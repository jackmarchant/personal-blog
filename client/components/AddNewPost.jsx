AddNewPost = React.createClass({
	getInitialState() {
		return {
			title: '',
			body: '',
		};
	},
	handleTextChange(e) {
		let field = e.target.name, value = e.target.value;
		if (field == 'title') {
			this.setState({
				title: value,
			});
		} else if (field == 'body') {
			this.setState({
				body: value
			});
		}
		return false;
	},
	handleSubmit(e) {
		e.preventDefault();
		let title = this.state.title, body = this.state.body;
		if (title == '' || body == '') return;
		Meteor.call('createBlogPost', {title: title, body: body});
		this.setState({
			title: '',
			body: '',
		});
	},
	render() {
		return (
			<div className="add-new-post">
				<h3>Add new post</h3>
				<form onSubmit={this.handleSubmit}>
					<fieldset>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input type="text" name="title" className="form-control" value={this.state.title} onChange={this.handleTextChange} />
						</div>
						<div className="form-group">
							<label htmlFor="body">Body</label>
							<textarea rows="5" name="body" className="form-control" value={this.state.body} onChange={this.handleTextChange}></textarea>
						</div>
						<div className="form-group">
							<button onClick={this.handleSubmit} className="btn btn-success">Add post</button>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}
});