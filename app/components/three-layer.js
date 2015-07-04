import Ember from 'ember';

export default Ember.Component.extend({
  model : null,
  meshes: null,
  name: null,

  didInsertElement: function() {
    this._super();
    console.log("layer model: " + this.model);
  },

});
