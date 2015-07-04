import Ember from 'ember';

export default Ember.Component.extend({
  index: 0,
  activity: null,
  scene: null,
  defaultMaterial : new THREE.MeshLambertMaterial({ color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors }),

  initRendering: Ember.on("init", function () {
    var orderGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    this.applyVertexColors(orderGeometry, new THREE.Color(Math.random() * 0xffffff));
    this.set("mesh", new THREE.Mesh(orderGeometry , this.get("defaultMaterial")));
    this.get("mesh").position.set(0,0,this.get("index"));
    this.scene.add(this.get("mesh"));
  }),

  didTimeWindowChange: Ember.observer("activity.startAt", "activity.endAt", function () {
    this.get("mesh").position.set(this.get("activity.startAt"),0,this.get("index"));
  }),


  applyVertexColors: function(geom, color) {
    geom.faces.forEach(function (face) {
      var n = ( face instanceof THREE.Face3 ) ? 3 : 4;
      for (var j = 0; j < n; j++) {
        face.vertexColors[j] = color;
      }
    });
  }

});
