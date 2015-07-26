import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('three-body', 'Unit | Component | three body', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('model and body ok', function(assert) {
  // Creates the component instance
  var component = this.subject({model: "testModel"});
  this.render();

  // set model, expect body to be set
  assert.ok(!!component.model);
  assert.equal(component.body.type, "Mesh");
});
