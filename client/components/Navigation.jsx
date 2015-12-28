Navigation = React.createClass({
	getDefaultNavigationItems() {
		return [
			{menuTitle: 'Home', link: '/'},
			{menuTitle: 'Blog', link: '/blog'}
		];
	},
	getInitialState() {
		return {
			items: this.getDefaultNavigationItems(),
		}
	},
	renderNavigationItems(items) {
		let self = this;
		return items.map(function(item, index) {
			return <NavigationItem key={index} link={item.link} menuTitle={item.menuTitle} />;
		});
	},
	render() {
		return (
			<div className="navigation">
				<ul>
					{this.renderNavigationItems(this.state.items)}
				</ul>
			</div>
		);
	}
});