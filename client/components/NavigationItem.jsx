const Link = ReactRouter.Link;
NavigationItem = React.createClass({
	render() {
		return <li key={this.props.key}><Link to={this.props.link}>{this.props.menuTitle}</Link></li>;
	}
});