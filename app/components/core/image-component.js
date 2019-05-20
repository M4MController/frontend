import Component from '@ember/component';
import {
  attribute,
  tagName,
} from '@ember-decorators/component';
import {computed} from '@ember/object';

@tagName('img')
export default class extends Component {
  @attribute
  @computed('name')
  get src() {
    return `/images/${this.get('name')}.svg`;
  }
}
