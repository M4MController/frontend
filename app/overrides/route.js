import Ember from 'ember';
import Route from '@ember/routing/route';
import {run} from '@ember/runloop';
import {observes} from '@ember-decorators/object';

Route.reopen({
  activate(...args) {
    this._super(...args);
    this.changePageTitle(this.get('pageTitle'));
  },

  @observes('pageTitle')
  _onPageTitleChange() {
    this.changePageTitle(this.get('pageTitle'));
  },

  changePageTitle(pageTitle) {
    pageTitle = pageTitle || 'M4M';

    run(() => {
      Ember.$(document).attr('title', pageTitle);
    });
  },
});
