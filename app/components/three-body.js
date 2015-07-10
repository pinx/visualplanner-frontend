import Ember from 'ember';

export default Ember.Component.extend({
  index: 0,
  body: null,
  afterCreate: null,
  defaultMaterial: new THREE.MeshLambertMaterial({ color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors }),

  initRendering: Ember.on("init", function () {
    var orderGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    this.applyVertexColors(orderGeometry, new THREE.Color(Math.random() * 0xffffff));

    let body = new THREE.Mesh(orderGeometry , this.get("defaultMaterial"));
    body.position.set(0,0,this.get("index"));
    this.set("body", body);
    this.get('afterCreate')(body);
  }),

  didTimeWindowChange: Ember.observer("model.startAt", "model.endAt", function () {
    this.get("body").position.set(this.get("model.startAt"), 0, this.get("index"));
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
