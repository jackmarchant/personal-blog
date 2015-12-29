Navigation = React.createClass({
	// Meteor data
	mixins: [ReactMeteorData],
	/**
	 * Meteor data from mongo
	 * @return {object} metoer data
	 */
	getMeteorData() {
		return {
			loggedInUser: Meteor.user()
		}
	},
	/**
	 * Get default navigation items
	 * @return {array} of navigation objects
	 */
	getDefaultNavigationItems() {
		let navItems = [
			{menuTitle: 'Home', link: '/'},
			{menuTitle: 'Blog', link: '/blog'},
		];
		return navItems;
	},
	/**
	 * Initial state for component
	 * @return {object}
	 */
	getInitialState() {
		return {
			items: this.getDefaultNavigationItems(),
		}
	},
	/**
	 * Render navigation items, looping over them returning a navigation item for each
	 * @param  {array} items navigation objects @getDefaultNavigationItems
	 * @return {array} <NavigationItem /> components
	 */
	renderNavigationItems(items) {
		let self = this;
		return items.map(function(item, index) {
			return <NavigationItem key={index} link={item.link} menuTitle={item.menuTitle} />;
		});
	},
	/**
	 * Check that a navigation item exists in an array of objects
	 * @param  {string} menuTitle title to check if it exists
	 * @param  {array} 	checkArray   array to check against
	 * @return {null|string} nav item found
	 */
	navItemExists(menuTitle, checkArray){
	    for (var i=0; i < checkArray.length; i++) {
	        if (checkArray[i].menuTitle === menuTitle) {
	            return checkArray[i];
	        }
	    }
	},
	/**
	 * Render this component
	 * @return {jsx}
	 */
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