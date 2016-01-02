/*global Navigation, renderComponent */

describe("Navigation Component", function() {
  var defProps, renderWithProps, component, el, $el;

  beforeEach(function() {
    renderWithProps = function(props) {
      component = renderComponent(Navigation, props);
      el = React.findDOMNode(component);
      $el = $(el);
    };
  });

  it('should have default navigation items', () => {
    renderWithProps({});
    expect(component.state.items).toBeDefined();
    expect(component.state.items).toContain({menuTitle: 'Home', link: '/'});
    expect(component.state.items).toContain({menuTitle: 'Blog', link: '/blog'});
  });

  it('should detect existing navigation items', () => {
    renderWithProps({});
    expect(component.navItemExists('Home', component.state.items)).toBeDefined();
    expect(component.navItemExists('Admin', component.state.items)).not.toBeDefined();
  });

});
