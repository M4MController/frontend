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
  });
  this.route('account', {path: '/'}, function() {
    this.route('subject', {path: '/object/:object_id'});
    this.route('finance', function() {
      this.route('subject', {path: '/:object_id'});
    });
    this.route('settings');
  });
});

export default Router;
