import Ember from 'ember';

export default Ember.Component.extend({
  name  : null,
  model : null,
  scene : null,
  visible: true,

  actions: {
    addBodyToScene: function(body) {
      if (this.get('visible')) {
        this.get('scene').add(body);
      }
    },
    removeBodyFromScene: function(body) {
      this.get('scene').remove(body);
    }
  }

});
