import Ember from 'ember';
import {run} from '@ember/runloop';
import {observes} from '@ember-decorators/object';

Ember.Route = class extends Ember.Route {
  constructor(...args) {
    super(...args);
    this.changePageTitle(this.get('pageTitle'));
  }

  @observes('pageTitle')
  _onPageTitleChange() {
    this.changePageTitle(this.get('pageTitle'));
  }

  changePageTitle(pageTitle) {
    pageTitle = pageTitle || 'M4M';

    run(() => {
      Ember.$(document).attr('title', pageTitle);
    });
  }
};
