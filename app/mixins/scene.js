import Ember from 'ember';
import config from '../config/environment';

export default Ember.Mixin.create({
  scene         : new THREE.Scene(),

  initScene: Ember.on('willInsertElement', function() {

    this.scene.add(new THREE.AmbientLight(0x555555));

    var light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 0, 2000);
    this.scene.add(light);

    if (config.environment === 'development') {
      this.addAxes(100);
    }
  }),


  addAxes: function(axisLength) {
    this.scene.add(new THREE.AxisHelper(axisLength));
  },
});
