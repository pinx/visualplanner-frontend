import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  needs: ['resources'],
  tagName         : "three-render",
  width           : 100,
  height          : 100,

  scene           : new THREE.Scene(),
  camera          : null,
  gLrenderer        : new THREE.WebGLRenderer({antialias: true, alpha: true}),
  geometry        : new THREE.Geometry(),
  boundingBox     : null,

  controls        : null,
  mouse           : new THREE.Vector2(),
  offset          : new THREE.Vector3(10, 10, 10),

  stats           : new Stats(),

  schedule        : null,
  activities      : Ember.computed('schedule', function () {
    return this.get('schedule.activities')
  }),
  resources       : Ember.computed('schedule', function () {
    return this.get('schedule.resources')
  }),


  didInsertElement: function() {
    this.init3D();
    this.animate();
  },


  init3D: function() {
    this.initCamera();
    this.initRenderer();
    this.initScene();
    if (config.environment == 'development') {
      this.addStats();
      this.addAxes(100);
    }
    this.gLrenderer.domElement.addEventListener('mousemove', Ember.run.bind(this, this.onMouseMove));
    Ember.$(window).on('resize', Ember.run.bind(this, this.onWindowResize));

  },


  initCamera: function() {
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

  },


  initRenderer: function() {

    //this.gLrenderer.setSize(window.innerWidth, window.innerHeight);
    this.gLrenderer.setClearColor(0xffffff);
    this.gLrenderer.setPixelRatio(window.devicePixelRatio);
    this.gLrenderer.sortObjects = false;

    this.$().append(this.gLrenderer.domElement);
    this.onWindowResize();
  },


  initScene: function() {

    this.scene.add(new THREE.AmbientLight(0x555555));

    var light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 0, 2000);
    this.scene.add(light);

  },


  addStats: function() {

    // Small statistics window in top corner
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';
    this.$().append(this.stats.domElement);

  },


  addAxes: function(axisLength) {

    this.scene.add(new THREE.AxisHelper(axisLength));

  },


  showAll: function() {
    var bBox = new THREE.Box3({x: Infinity, y: Infinity, z: Infinity}, {x: -Infinity, y: -Infinity, z: -Infinity});
    console.log(bBox);
    this.scene.children.filter(function (obj) {return (obj instanceof THREE.Mesh) && (obj.position.x !== 0 && obj.position.y !== 0);})
      .forEach(function (mesh) {
        bBox.max.z = Math.max(bBox.max.z, Math.max.apply(Math, mesh.geometry.vertices.map(function(vertex) {return vertex.z;})));
        bBox.min.x = Math.min(bBox.min.x, mesh.position.x);
        bBox.min.y = Math.min(bBox.min.y, mesh.position.y);
        bBox.max.x = Math.max(bBox.max.x, mesh.position.x);
        bBox.max.y = Math.max(bBox.max.y, mesh.position.y);
      });
    bBox.min.z = 0;

    var maxSize = Math.max(bBox.size().x,bBox.size().y);
    var bBoxZ = Math.max(bBox.min.z, bBox.max.z);
    var dist = bBoxZ + maxSize / 2 / Math.tan(Math.PI * this.camera.fov / 360) ;
    var center = bBox.center();

    // Move the camera to the bounding box
    new TWEEN.Tween(this.camera.position)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .to({ x: center.x, y: center.y, z: dist }, 5000)
      .delay(1000)
      .start();

    // ... and keep the camera targeted at the bounding box
    new TWEEN.Tween(this.controls.target)
      .easing(TWEEN.Easing.Back.Out)
      .to({ x: center.x, y: center.y, z: center.z }, 5000)
      .delay(1000)
      .start();

  },


  onMouseMove: function (e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  },

  onWindowResize: function() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    //controls.handleResize();
    this.gLrenderer.setSize( window.innerWidth, window.innerHeight );
  },


  animate: function() {
    requestAnimationFrame(Ember.run.bind(this, this.animate));
    TWEEN.update();
    this.renderScene();
    this.stats.update();
  },


  renderScene: function() {
    this.controls.update();
    this.gLrenderer.render(this.scene, this.camera);
  },


});
