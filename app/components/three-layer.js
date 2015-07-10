import Ember from 'ember';

export default Ember.Component.extend({
  name  : null,
  model : null,
  scene : null,
  //meshes: null,

  didInsertElement: function() {
    this._super();
    console.log("layer: " + this.name);
  },

  bodies: Ember.computed('model', function (m) {
    console.log(m);
    console.log('requesting bodies');
    return this.model;
  })

});
