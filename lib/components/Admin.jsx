Admin = React.createClass({
	// Meteor data
	mixins: [ReactMeteorData],
	/**
	 * Meteor data from mongo
	 * @return {object} data
	 */
	getMeteorData() {
		return {
			userLoggedIn: (Meteor.userId()) ? true : false,
			user: Meteor.user(),
		};
	},
	/**
	 * Initial state of component
	 * @return {object} state
	 */
	getInitialState() {
		return {
			email: '',
			password: '',
			newUserToggle: false,
			formMessage: '',
		};
	},
	/**
	 * Handle text change of field values
	 * @param  {event} 	e
	 * @return {bool} 	false
	 */
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
	handleError(error) {
		if (error) {
			this.setState({
				formMessage: error.reason
			});
			return false;
		}
		return true;
	},
	/**
	 * Handle submission of admin login form, can also create a new user if toggle is selected
	 * @param  {event} e
	 * @return {bool}  false
	 */
	handleSubmit(e) {
		let newUserCreated, loggedIn;
		e.preventDefault();
		if (this.state.newUserToggle) {
			newUserCreated = Meteor.call('createNewUser', {email: this.state.email, password: this.state.password},this.handleError);
			if (newUserCreated) {
				this.setState({
					email: '',
					password: '',
					formMessage: 'A new user has been created. You can now login with your email address.',
				});
			}
			return false;
		} else {
			loggedIn = Meteor.loginWithPassword(this.state.email, this.state.password, this.handleError);
			if (loggedIn) {
				this.setState({
					email: '',
					password: '',
				});
			}
			return false;
		}
	},
	/**
	 * Handle checkbox toggle change
	 * @return {void}
	 */
	handleCheckboxChange() {
		this.setState({
			newUserToggle: !this.state.newUserToggle
		});
	},
	/**
	 * Get the admin user details
	 * @return {jsx} admin email address
	 */
	getAdminUser() {
		let user = this.data.user;
		if (user) {
			let email = user.emails[0].address;
			return (<span className="admin-email">{email}</span>);
		}
		return null;
	},
	/**
	 * Logout currentUser
	 * @return {void} 
	 */
	logoutUser() {
		Meteor.logout();
	},
	/**
	 * Render a form message
	 * @return {jsx}
	 */
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
	/**
	 * Render this component
	 * @return {jsx}
	 */
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