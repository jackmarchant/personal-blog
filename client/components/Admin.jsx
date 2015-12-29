Admin = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		return {
			userLoggedIn: (Meteor.userId()) ? true : false,
			user: Meteor.user(),
		};
	},
	getInitialState() {
		return {
			email: '',
			password: '',
			newUserToggle: false,
			formMessage: '',
		};
	},
	handleTextChange(e) {
		let field = e.target.name, value = e.target.value;
		if (field == 'email') {
			this.setState({
				email: value,
			});
		} else if (field == 'password') {
			this.setState({
				password: value
			});
		}
		return false;
	},
	handleSubmit(e) {
		e.preventDefault();
		if (this.state.newUserToggle) {
			Meteor.call('createNewUser', {email: this.state.email, password: this.state.password});
			this.setState({
				email: '',
				password: '',
				formMessage: 'A new user has been created. You can now login with your email address.',
			});
			return false;
		} else {
			Meteor.loginWithPassword(this.state.email, this.state.password);
			this.setState({
				email: '',
				password: '',
			});
			return false;
		}
	},
	handleCheckboxChange() {
		this.setState({
			newUserToggle: !this.state.newUserToggle
		});
	},
	getAdminUser() {
		let user = this.data.user;
		if (user) {
			let email = user.emails[0].address;
			return (<span className="admin-email">{email}</span>);
		}
		return null;
	},
	logoutUser() {
		Meteor.logout();
	},
	renderFormMessage() {
		if (this.state.formMessage) {
			return (
				<div className="form-message">
					<p>{this.state.formMessage}</p>
				</div>
			);
		}
		return null;
	},
	render() {
		if (!this.data.userLoggedIn) {
			return (
				<div className="container position-center">
					<h2>Log in</h2>
					{this.renderFormMessage()}
					<form onSubmit={this.handleSubmit}>
						<fieldset>
							<div className="form-group">
								<label htmlFor="email">Email Address</label>
								<input type="text" name="email" className="form-control" onChange={this.handleTextChange} />
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input type="password" name="password" className="form-control" onChange={this.handleTextChange} />
							</div>
							<div className="checkbox-group">
								<input type="checkbox" name="new-user" onClick={this.handleCheckboxChange} />
								<label htmlFor="new-user">New User</label>
							</div>
							<div className="form-group actions paddingtop">
								<button className="btn btn-success" onClick={this.handleSubmit}>Log in</button>
							</div>
						</fieldset>
					</form>
				</div>
			);
		} else {
			let welcome = (
				<div className="admin-welcome">
					<h1>Admin</h1>
					<p>You are logged in with email address: {this.getAdminUser()}</p>
					<p><Link to="/admin/add-new-post">Add a new blog post</Link></p>
					<button onClick={this.logoutUser} className="btn btn-warning">Logout</button>
				</div>
			);
			return (
				<div className="container position-center paddingtop">
					{this.props.children || welcome}
				</div>
			);
		}
	}
});