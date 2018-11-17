import Component from '@ember/component';
import {computed} from '@ember-decorators/object';

export default class extends Component {
  @computed('attrs.loading')
  get loading() {
    const loading = this.get('attrs.loading');
    return loading === undefined ? true : loading;
  }
}
