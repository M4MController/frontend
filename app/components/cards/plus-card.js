import Component from '@ember/component';
import {computed} from '@ember/object';

export default class extends Component {
  @computed('width')
  get containerClass() {
    return `plus col-${this.get('width')} full-height v-center h-center padding-1x`;
  }
}
