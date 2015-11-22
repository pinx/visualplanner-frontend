import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    Ember.RSVP.on('error', function(error) {console.log(error);debugger;});

    return Ember.RSVP.hash({
      activities: this.store.findAll('activity'),
      resources: this.store.findAll('resource')
    });
  },
  //
  // setupController: function(controller, model) {
  //   this._super(controller, model);
  //   // deferred getting of activities
  //   this.store.findAll('activity').then(function(activities) {
  //     controller.set('model.activities', activities);
  //   });
  // }
});
