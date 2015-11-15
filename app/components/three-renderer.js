import Ember from 'ember';
import GlRendererMixin from '../mixins/glrenderer';
import SceneMixin from '../mixins/scene';
import CameraMixin from '../mixins/camera';

export default Ember.Component.extend(
  GlRendererMixin,
  SceneMixin,
  CameraMixin, {

  width         : 100,
  height        : 100,

  geometry      : new THREE.Geometry(),
  boundingBox   : null,


  showAll: function() {
    var bBox = new THREE.Box3({x: Infinity, y: Infinity, z: Infinity}, {x: -Infinity, y: -Infinity, z: -Infinity});
    console.log(bBox);
    this.scene.children.filter(function (obj) {return (obj instanceof THREE.Mesh) && (obj.position.x !== 0 && obj.position.y !== 0);})
      .forEach(function (mesh) {
        bBox.max.z = Math.max(bBox.max.z, Math.max.apply(Math, mesh.geometry.vertices.map(function(vertex) {return vertex.z;})));
        bBox.min.x = Math.min(bBox.min.x, mesh.position.x);
        bBox.min.y = Math.min(bBox.min.y, mesh.position.y);
        bBox.max.x = Math.max(bBox.max.x, mesh.position.x);
        bBox.max.y = Math.max(bBox.max.y, mesh.position.y);
      });
    bBox.min.z = 0;

    var maxSize = Math.max(bBox.size().x,bBox.size().y);
    var bBoxZ = Math.max(bBox.min.z, bBox.max.z);
    var dist = bBoxZ + maxSize / 2 / Math.tan(Math.PI * this.camera.fov / 360) ;
    var center = bBox.center();

    // Move the camera to the bounding box
    new TWEEN.Tween(this.camera.position)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .to({ x: center.x, y: center.y, z: dist }, 5000)
      .delay(1000)
      .start();

    // ... and keep the camera targeted at the bounding box
    new TWEEN.Tween(this.controls.target)
      .easing(TWEEN.Easing.Back.Out)
      .to({ x: center.x, y: center.y, z: center.z }, 5000)
      .delay(1000)
      .start();

  },

});
