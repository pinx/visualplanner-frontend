import Ember from 'ember';
import computed, {readOnly} from 'ember-computed-decorators';

export default Ember.Mixin.create({
  defaultMaterial: new THREE.MeshLambertMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading,
    vertexColors: THREE.VertexColors,
    transparent: true,
    opacity: 0.5
  }),

  dateOffset: moment('2015-01-01'),

  createBody: function () {
    let geometry = new THREE.BoxGeometry(this.get('width'), 1, 1);
    let body = new THREE.Mesh(geometry , this.get("defaultMaterial"));
    this.applyVertexColors(geometry, new THREE.Color(Math.random() * 0xffffff));
    return body;
  },

  @readOnly
  @computed('available_from', 'dateOffset')
  x(available_from, dateOffset) {
    return moment(available_from).diff(dateOffset, 'hours');
  },

  setX(value) {
    let newValue = parseInt(value);
    if (newValue !== NaN) {
      let oldValue= this.get('x');
      if (newValue !== oldValue) {
        this.set('available_from', moment(this.get('available_from')).add(newValue-oldValue, 'h'));
        this.set('available_to', moment(this.get('available_to')).add(newValue-oldValue, 'h'));
      };
    }
  },

  @computed('id')
  y(id) {
    return parseInt(id);
  },

  @computed('id')
  z(id) {
    return 4 - parseInt(id);
  },

  @computed('available_from', 'available_to')
  width(available_from, available_to) {
    return moment.range(available_from, available_to).diff('hours');
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
