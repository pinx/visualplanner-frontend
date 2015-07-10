import Ember from 'ember';

export default Ember.Component.extend({
  index: 0,
  model: null,
  mesh: null,
  layer: null,
  material: null,

  initRendering: Ember.on("init", function () {
    console.log(this.mesh)
    // Create a THREE.Mesh object and add it to the layer, e.g.
    //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //this.set("mesh", new THREE.Mesh(geometry , this.get("defaultMaterial")));
    //this.get("mesh").position.set(0,0,0);
    //this.scene.add(this.get("mesh"));
  })
});
