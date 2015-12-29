Navigation = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		return {
			loggedInUser: Meteor.user()
		}
	},
	getDefaultNavigationItems() {
		let navItems = [
			{menuTitle: 'Home', link: '/'},
			{menuTitle: 'Blog', link: '/blog'},
		];
		return navItems;
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
	navItemExists(menuTitle, myArray){
	    for (var i=0; i < myArray.length; i++) {
	        if (myArray[i].menuTitle === menuTitle) {
	            return myArray[i];
	        }
	    }
	},
	render() {
		let navItems = this.state.items;
		if (this.data.loggedInUser && !this.navItemExists('Admin', navItems)) {
			navItems.push({menuTitle: 'Admin', link: '/admin'});
		}
		return (
			<div className="navigation">
				<ul>
					{this.renderNavigationItems(navItems)}
				</ul>
			</div>
		);
	}
});