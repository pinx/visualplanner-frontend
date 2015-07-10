import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['activities'],

  //activities: function () {
  //    return this.get('controllers.activities').model
  //}
  activities: Ember.computed("controllers.activities.model", function () {
    return this.get('controllers.activities').get('model')
  })

});
