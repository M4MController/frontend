import Ember from 'ember';
import {action, computed} from '@ember-decorators/object';
import {className} from '@ember-decorators/component';

Ember.Component = class extends Ember.Component {
  getAttr(prop) {
    const attrValue = this.get(prop);
    return attrValue === undefined ? this.defaultAttrs[prop] : attrValue;
  }

  @computed('globalClassNames')
  @className
  get _globalClassNames() {
    const globalClassNames = this.get('globalClassNames');
    return globalClassNames ? globalClassNames.join(' ') : '';
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
    obj.set(obj, property, !obj.get(obj, property));
  }

  @action
  transitionToRoute(route, ...args) {
    this.get('router').
      transitionTo(route, ...(args.slice(0, args.length - 1)));
  }
};
