import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    console.log('route activities')
    return this.store.findAll('activity')
  }
});
