import Ember from 'ember';

export default Ember.Mixin.create({
  defaultMaterial: new THREE.MeshLambertMaterial({ color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors }),

  createBody: function () {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let body = new THREE.Mesh(geometry , this.get("defaultMaterial"));
    this.applyVertexColors(geometry, new THREE.Color(Math.random() * 0xffffff));
    return body;
  },

  x: Ember.computed('start_at', function() {
    return this.get('start_at');
  }),
  setX: function (value) {
    this.set('start_at', value);
  },

  y: Ember.computed('start_at', function () {
    return 0;
  }),

  z: Ember.computed('start_at', function () {
    return 0;
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
