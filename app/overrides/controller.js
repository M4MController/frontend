import Ember from 'ember';
import {action} from '@ember/object';

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
