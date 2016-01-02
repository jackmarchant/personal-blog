/*global NavigationItem, renderComponent */

describe("NavigationItem Component", function() {
  var defProps, renderWithProps, component, el, $el;

  beforeEach(function() {
    defProps = {
      key: '1',
      link: '/example',
      menuTitle: 'Menu Title'
    };
    renderWithProps = function(props) {
      component = renderComponent(NavigationItem, props);
      el = React.findDOMNode(component);
      $el = $(el);
    };
  });

  it('should have all defined props', function() {
    renderWithProps(defProps);
    expect($el.attr('data-reactid')).toBeDefined();
    expect($el.find('a').attr('href')).not.toBeNull();
    expect($el.find('a').text()).toEqual('Menu Title');
  });

});
