import Component from '@ember/component';
import {computed} from '@ember-decorators/object';

export default class extends Component {
  @computed('attrs.width')
  get containerClass() {
    return `plus col-${this.get('attrs.width')} full-height v-center h-center padding-1x`;
  }
}
