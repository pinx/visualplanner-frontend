import Ember from 'ember';
import computed, {readOnly} from 'ember-computed-decorators';

export default Ember.Mixin.create({
  defaultMaterial: new THREE.MeshLambertMaterial({ color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors }),

  dateOffset: moment('2015-01-01'),

  createBody: function () {
    let geometry = new THREE.BoxGeometry(this.get('width'), 1, 1);
    let body = new THREE.Mesh(geometry , this.get("defaultMaterial"));
    this.applyVertexColors(geometry, new THREE.Color(Math.random() * 0xffffff));
    return body;
  },

  @computed('start_at', 'dateOffset')
  x(start_at, dateOffset) {
    return moment(start_at).diff(dateOffset, 'hours');
  },
  setX(value) {
    let newValue = parseInt(value);
    if (newValue !== NaN) {
      let oldValue= this.get('x');
      if (newValue !== oldValue) {
        this.set('start_at', moment(this.get('start_at')).add(newValue-oldValue, 'h'));
        this.set('end_at', moment(this.get('end_at')).add(newValue-oldValue, 'h'));
      };
    }
  },

  @computed('id')
  y(id) {
    return 1; //parseInt(id);
  },

  @computed
  z() {
    return 1;
  },

  @computed('start_at', 'end_at')
  width(start_at, end_at) {
    return moment.range(start_at, end_at).diff('hours');
  },

  applyVertexColors: function(geom, color) {
    geom.faces.forEach(function (face) {
      var n = ( face instanceof THREE.Face3 ) ? 3 : 4;
      for (var j = 0; j < n; j++) {
        face.vertexColors[j] = color;
      }
    });
  }

  });
