import Ember from 'ember';

export default Ember.Component.extend({
  name  : null,
  model : null,
  scene : null,
  visible: true,

  bodies: Ember.computed.alias('model'),

  actions: {
    addBodyToScene: function(body) {
      if (this.get('visible')) {
        this.get('scene').add(body);
      }
    }
  }

});
