import Ember from 'ember';
import SceneMixin from '../../../mixins/scene';
import { module, test } from 'qunit';

module('Unit | Mixin | scene');

// Replace this with your real tests.
test('it works', function(assert) {
  var SceneObject = Ember.Object.extend(SceneMixin);
  var subject = SceneObject.create();
  assert.ok(subject);
});
