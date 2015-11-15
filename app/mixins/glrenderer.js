import Ember from 'ember';
import config from '../config/environment';

export default Ember.Mixin.create({
  gLrenderer    : null,
  mouse         : null,
  stats         : null,

  createRenderer: Ember.on('willInsertElement', function() {
    this.gLrenderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    this.gLrenderer.setClearColor(0xffffff);
    this.gLrenderer.setPixelRatio(window.devicePixelRatio);
    this.gLrenderer.sortObjects = false;

    this.mouse = new THREE.Vector2();
  }),

  initRenderer: Ember.on('didInsertElement', function() {
    this.$().append(this.gLrenderer.domElement);
    this.onWindowResize();

    this.gLrenderer.domElement.addEventListener('mousemove', Ember.run.bind(this, this.onMouseMove));
    Ember.$(window).on('resize', Ember.run.bind(this, this.onWindowResize));

    this.addStats();

    this.animate();
  }),

  //----------------------------------------------------
  // 3D render loop
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
  //----------------------------------------------------


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

  addStats: function() {
    if (config.environment === 'development') {
      this.stats = new Stats();
      // Small statistics window in top corner
      this.stats.domElement.style.position = 'absolute';
      this.stats.domElement.style.top = '0px';
      this.$().append(this.stats.domElement);
    } else {
      // dummy function
      this.stats = this.stats || {update: function(){}};
    }
  },

});
