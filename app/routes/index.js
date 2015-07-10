import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var resources = this.store.findAll('resource');
    return Ember.RSVP.hash({
      activities: [],
      resources: resources
    });
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    this.store.findAll('activity').then(function(activities) {
      controller.set('model.activities', activities);
    });
  }
});
