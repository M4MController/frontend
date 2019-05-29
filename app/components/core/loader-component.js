import Component from '@ember/component';
import {computed} from '@ember/object';

export default class extends Component {
  @computed('loading')
  get isLoading() {
    const loading = this.get('loading');
    return loading === undefined ? true : loading;
  }
}
