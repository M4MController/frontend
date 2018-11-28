import Route from '@ember/routing/route';
import {on} from '@ember-decorators/object';

export default class extends Route {
  @on('activate')
  transitionToLanding() {
    // note: M4M landing is an external web app
    window.location = '/about';
  }
}
