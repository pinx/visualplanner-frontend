import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});
//define hierarchy of routes, application route is not visible, but can
//be assumed to live at the top level
//{{outlet}} in the template is the slot for the child routes' output.
Router.map(function() {
});

export default Router;
