/*global Admin, renderComponent */
'use strict';
describe("Admin Component", function() {
  var defProps, renderWithProps, component, el, $el;

  beforeEach(function() {
    renderWithProps = function(props) {
      component = renderComponent(Admin, props);
      el = React.findDOMNode(component);
      $el = $(el);
    };
  });

  it('should change state when user toggles checkbox', () => {
    renderWithProps({});
    expect(component.state.newUserToggle).toBe(false);
    component.handleCheckboxChange();
    expect(component.state.newUserToggle).toBe(true);
  });

  it('should render a form when not logged in', () => {
      expect($el.find('form').length).toBe(1);
  });

  it('should change the state of form message on error', () => {
    expect(component.state.formMessage).toEqual('');
    let error = {
      reason: 'A sample message',
    };
    component.handleError(error);
    expect(component.state.formMessage).toEqual('A sample message');
  });

});
