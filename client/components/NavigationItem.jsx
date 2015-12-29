const Link = ReactRouter.Link;
NavigationItem = React.createClass({
	/**
	 * Render this component
	 * @return {jsx}
	 */
	render() {
		return <li key={this.props.key}><Link to={this.props.link}>{this.props.menuTitle}</Link></li>;
	}
});