import Component from '@ember/component';
import {
  attribute,
  tagName,
} from '@ember-decorators/component';
import {computed} from '@ember-decorators/object';

@tagName('img')
export default class extends Component {
  @attribute onClick;

  @attribute
  @computed('name')
  get src() {
    return `/icons/${this.get('name')}.svg`;
  }

  @attribute
  @computed('text')
  get title() {
    return this.get('text') || '';
  }
}
