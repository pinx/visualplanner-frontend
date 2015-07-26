import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    // get resources now, wait until they have arrived from the backend
    var resources = this.store.findAll('resource');
    return Ember.RSVP.hash({
      activities: [],
      resources: resources
    });
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    // deferred getting of activities
    this.store.findAll('activity').then(function(activities) {
      controller.set('model.activities', activities);
    });
  }
});
