/*global BlogList, renderComponent, loginWithTestUser */
'use strict';
describe("BlogList Component", function() {
  var defProps, renderWithProps, component, el, $el;

  beforeEach(function() {
    renderWithProps = function(props) {
      component = renderComponent(BlogList, props);
      el = React.findDOMNode(component);
      $el = $(el);
    };
  });

  it('should not load posts', () => {
    renderWithProps({
      loading: true,
      posts: [{_id: '12312xsxa', title: 'hello world', body: 'hello again', date: new Date()}]
    });
    expect(component.props.loading).toBeTruthy();
    expect($el.find('article').length == 1).toBeFalsy();
  });

  it('should load posts', () => {
    renderWithProps({
      loading: false,
      posts: [{_id: '12312xsxa', title: 'hello world', body: 'hello again', date: new Date()}]
    });
    expect(component.props.loading).toBeFalsy();
    expect($el.find('article').length == 1).toBeTruthy();
  });

});