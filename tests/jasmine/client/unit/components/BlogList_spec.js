/*global BlogList, renderComponent */

describe("BlogList Component", function() {
  var defProps, renderWithProps, component, el, $el;

  beforeEach(function() {
    renderWithProps = function(props) {
      component = renderComponent(BlogList, props);
      el = React.findDOMNode(component);
      $el = $(el);
    };
  });

  it('should not load posts', function() {
    renderWithProps({
      postsLoading: true,
      posts: [{_id: '12312xsxa', title: 'hello world', body: 'hello again', date: new Date()}]
    });
    expect(component.props.postsLoading).toBeTruthy();
    expect($el.find('article').length == 1).toBeFalsy();
  });

  it('should load posts', function() {
    renderWithProps({
      postsLoading: false,
      posts: [{_id: '12312xsxa', title: 'hello world', body: 'hello again', date: new Date()}]
    });
    expect(component.props.postsLoading).toBeFalsy();
    expect($el.find('article').length == 1).toBeTruthy();
  });

});
