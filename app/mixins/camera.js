import Ember from 'ember';

export default Ember.Mixin.create({

  camera        : null,
  controls      : null,

  initCamera: Ember.on('willInsertElement', function() {
    this.camera = new THREE.PerspectiveCamera();
    this.camera.fov = 70;
    this.camera.aspect = this.get('width')/this.get('height');
    this.camera.near = 0.1;
    this.camera.far = 100000;
    this.camera.position.z = 100;

    this.controls = new THREE.TrackballControls(this.camera);

    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
  }),
});
