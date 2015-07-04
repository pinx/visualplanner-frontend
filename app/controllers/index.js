import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['activities'],

  init: function () {
    this._super();
    console.log(this);
  }

});
