import Ember from 'ember';
import {action} from '@ember-decorators/object';

Ember.Controller = class extends Ember.Controller {
  @action
  setProp(property, value) {
    this.set(property, value);
  }

  @action
  toggle(property) {
    this.set(property, !this.get(property));
  }
};
