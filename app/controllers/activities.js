import Ember from 'ember';

export default Ember.Controller.extend({
  activities: function () {
  //  console.log('fetching activities from controller');
    return this.store.findAll('activity')
  }
});
