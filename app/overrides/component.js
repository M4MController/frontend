import Ember from 'ember';
import {computed as emberComputed} from '@ember/object';
import {action, computed, on} from '@ember-decorators/object';
import {className} from '@ember-decorators/component';

Ember.Component = class extends Ember.Component {
  @on('didUpdateAttrs', 'didReceiveAttrs')
  _on() {
    if (this.defaultAttrs) {
      for (let attr of Object.keys(this.defaultAttrs)) {
        const prop = `attrs.${attr}`;
        this.set(attr, emberComputed(prop, () => {
          return this.get(prop) || this.defaultAttrs[attr];
        }));
      }
    }
  }

  @computed('localClassNames', 'styleNamespace')
  @className
  get _localClassNames() {
    const localClassNames = this.get('localClassNames');
    if (localClassNames) {
      const styleNamespace = this.get('styleNamespace');
      return localClassNames.map((x) => `${styleNamespace}${x}`).
        join(' ');
    } else {
      return '';
    }
  }

  @action
  toggle(obj, property) {
    if (!property) {
      property = obj;
      obj = this;
    }
    this.set(obj, property, !this.get(obj, property));
  }

  @action
  transitionToRoute(route, ...args) {
    this.get('router').
      transitionTo(route, ...(args.slice(0, args.length - 1)));
  }
};
