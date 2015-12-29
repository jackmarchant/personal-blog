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
		// Meteor.call('createNewUser', {email: this.state.email, password: this.state.password});
		Meteor.loginWithPassword(this.state.email, this.state.password);
		this.setState({
			email: '',
			password: '',
			loggedIn: true
		});
		return false;
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
	render() {
		if (!this.data.userLoggedIn) {
			return (
				<div className="container position-center">
					<h2>Log in</h2>
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
							<div className="form-group actions">
								<button className="btn btn-success" onClick={this.handleSubmit}>Log in</button>
							</div>
						</fieldset>
					</form>
				</div>
			);
		} else {
			return (
				<div className="container position-center paddingtop">
					<p>You are logged in with email address: {this.getAdminUser()}</p>
					<button onClick={this.logoutUser} className="btn btn-warning">Logout</button>
				</div>
			);
		}
	}
});