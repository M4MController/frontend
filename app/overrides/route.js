import Ember from 'ember';
import {run} from '@ember/runloop';
import {observes} from '@ember-decorators/object';
import {IS_LITE_MODE} from '../constants';

Ember.Route = class extends Ember.Route {
  isLiteMode = IS_LITE_MODE;

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
