/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'visualplanner-frontend',
    environment: environment,
    baseURL: '/demo',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        'ember-htmlbars-attribute-syntax': true,
         'ember-htmlbars-inline-if-helper': true,
         'ember-htmlbars-component-generation': true
      }
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline'",
      'font-src': "'self' 'unsafe-inline'",
      'connect-src': "'self' http://localhost:4000",
      'img-src': "'self'",
      'style-src': "'self' 'unsafe-inline'",
      'media-src': "'self'"
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.baseURL = '/';
    //ENV['api-host'] = '',
    ENV['api-host'] = 'http://localhost:4000',
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.baseURL = '/demo'
  }

  return ENV;
};
