import Ember from 'ember';
import CameraMixin from '../../../mixins/camera';
import { module, test } from 'qunit';

module('Unit | Mixin | camera');

// Replace this with your real tests.
test('it works', function(assert) {
  var CameraObject = Ember.Object.extend(CameraMixin);
  var subject = CameraObject.create();
  assert.ok(subject);
});
