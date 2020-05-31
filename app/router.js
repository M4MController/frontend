/* eslint-disable no-invalid-this */

import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('auth', {resetNamespace: true}, function() {
    this.route('log-in');
    this.route('sign-up');
  });
  this.route('account', function() {
    this.route('subject', {path: '/object/:object_id'});
    this.route('company-account', {path: '/company/:company_id'});
    this.route('sensor', {path: '/sensor/:sensor_id'});
    this.route('finance', function() {
      this.route('subject', {path: '/:object_id'});
    });
    this.route('settings', function() {
      this.route('account');
      this.route('devices');
      this.route('payment');
    });
    this.route('set-up', function() {
      this.route('object-create');
      this.route('social-binding');
      this.route('setup-key');
      this.route('set-up-controller');
      this.route('instruction');
    });
  });
  this.route('redirect');
  this.route('setup');
});

export default Router;
