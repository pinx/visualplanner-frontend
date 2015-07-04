import Ember from 'ember';

export default Ember.Component.extend({
  name  : null,
  model : null,
  scene : null,
  meshes: null,

  didInsertElement: function() {
    this._super();
    console.log("layer model: " + this.model);
  },

});
