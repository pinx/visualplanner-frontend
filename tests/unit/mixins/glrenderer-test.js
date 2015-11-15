import Ember from 'ember';
import GlrendererMixin from '../../../mixins/glrenderer';
import { module, test } from 'qunit';

module('Unit | Mixin | glrenderer');

// Replace this with your real tests.
test('it works', function(assert) {
  var GlrendererObject = Ember.Object.extend(GlrendererMixin);
  var subject = GlrendererObject.create();
  assert.ok(subject);
});
