TestUtils = React.addons.TestUtils;
Simulate = TestUtils.Simulate;
/**
 * Render a React component
 * @param  {React.Component} component 
 * @param  {object} props properties
 * @return {React.Component} component
 */
renderComponent = function (comp, props) {
  return TestUtils.renderIntoDocument(
    React.createElement(comp, props)
  );
};
/**
 * Simulate a click event on a jquery object
 * @param  {jQuery object} $el to click
 * @return {void}
 */
simulateClickOn = function($el) {
  React.addons.TestUtils.Simulate.click($el[0]);
};
/**
 * Login to Meteor with a test user
 * @return {object} testUser
 */
loginWithTestUser = function() {
	var testUser = {
      email: 'test@email.com',
      password: 'testing',
    };
    Accounts.createUser(testUser, function(err, success){
       Meteor.loginWithPassword(testUser, function(err){
        if (err) return false;
       });
    });
    return testUser;
}
