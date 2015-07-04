import Ember from 'ember';

export default Ember.Component.extend({
  index: 0,
  resource: null,
  scene: null,
  defaultMaterial : new THREE.MeshBasicMaterial({wireframe: true, color: 0x000000}),

  initRendering: Ember.on("init", function () {
    var geometry = new THREE.BoxGeometry( 2, 2, 2 );
    this.set("mesh", new THREE.Mesh(geometry , this.get("defaultMaterial")));
    this.get("mesh").position.set(0,0,this.get("index"));
    this.scene.add(this.get("mesh"));
  }),

  didTimeWindowChange: Ember.observer("resource.@each.resourceAvailability.startAt", "resource.@each.resourceAvailability.endAt", function () {
    //TODO: copied from activity-box, needs to be adapted
    this.get("mesh").position.set(this.get("resourceAvailability.startAt"),0,this.get("index"));
  }),

});
