import Ember from 'ember';

export default Ember.Component.extend({
  index: -1,
  //_body: null,
  body: null,
  model: null,
  afterCreate: null,
  afterDestroy: null,

  didInsertElement() {
    this._super();
    var body = this.model.createBody();
    body.position.set(this.model.get('x'), this.model.get('y'), this.model.get('z'));
    this.body = body;

    this.model.addObserver('x', Ember.run.bind(this, this.positionObserver));
    this.model.addObserver('y', Ember.run.bind(this, this.positionObserver));
    this.model.addObserver('z', Ember.run.bind(this, this.positionObserver));

    let afterCreate = this.get('afterCreate');
    if (typeof afterCreate === 'function') {afterCreate(body);}
  },

  willDestroyElement: function() {
    this._super();
    this.model.removeObserver('x', Ember.run.bind(this, this.positionObserver));
    this.model.removeObserver('y', Ember.run.bind(this, this.positionObserver));
    this.model.removeObserver('z', Ember.run.bind(this, this.positionObserver));

    let afterDestroy = this.get('afterDestroy');
    if (typeof afterDestroy === 'function') {afterDestroy(this.get('body'));}
  },

  positionObserver: function(model) {
    // console.log(model);
    var body = this.get('body');
    var position = {x: body.position.x, y: body.position.y, z: body.position.z};
    var newPosition = {x: model.get('x'), y: model.get('y'), z: model.get('z')};
    // console.log(newPosition);
    var tween = new TWEEN.Tween(position)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .to(newPosition, 1000);
    tween.onUpdate(function () {
      // console.log(body.position);
      body.position.set(position.x, position.y, position.z);
    });
    tween.start();
  },

  actions: {
    updateX(value) {
      this.get('model').setX(value);
      console.log(value);
    },
    click: function () {
      console.log(this);
    },
    move: function(newPosition) {
      console.log(newPosition);
    }
  }

});
