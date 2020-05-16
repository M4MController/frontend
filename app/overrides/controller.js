import Ember from 'ember';
import {action} from '@ember/object';
import {IS_LITE_MODE} from '../constants';

Ember.Controller = class extends Ember.Controller {
  isLiteMode = IS_LITE_MODE;

  @action
  setProp(property, value) {
    this.set(property, value);
  }

  @action
  toggle(property) {
    this.set(property, !this.get(property));
  }
};
