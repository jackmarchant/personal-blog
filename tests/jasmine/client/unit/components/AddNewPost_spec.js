/*global AddNewPost, renderComponent */

describe("AddNewPost Component", function() {
  var defProps, renderWithProps, component, el, $el;

  beforeEach(function() {
    renderWithProps = function(props) {
      component = renderComponent(AddNewPost, props);
      el = React.findDOMNode(component);
      $el = $(el);
    };
  });

  it('should render a form with submit handlers', function() {
      renderWithProps({});
      expect($el.find('form').length).toBe(1);
      expect($el.find('form').attr('onsubmit')).not.toBeNull();
      expect($el.find('form button').attr('onclick')).not.toBeNull();
  });

});
