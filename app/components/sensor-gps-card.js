import Component from '@ember/component';
import {action} from '@ember/object';
import {on, observes} from '@ember-decorators/object';

export default class extends Component {
  zoom = 17;
  radius=5;
  lat ='51.507568';
  lng = '-0.127762';

  isFirst = true;
  isFollowing = false;

  @on('didReceiveAttrs')
  @observes('sensor.value.lat', 'sensor.value.lon')
  changeValue() {
    if (this.isFirst || this.isFollowing) {
      this.set('isFirst', false);
      this.set('lat', this.get('sensor.value.lat'));
      this.set('lng', this.get('sensor.value.lon'));
    }
  }

  @action
  onButtonFollowClick() {
    this.set('isFollowing', !this.isFollowing);
  }

  @action
  onZoomChanged(a) {
    this.set('radius', (Math.pow(2, 20 - a.map.getZoom())));
  }
}
