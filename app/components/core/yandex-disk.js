import Component from '@ember/component';
import {action, computed} from '@ember/object';

export default class extends Component {
  @computed('redirect')
  get redirectUrl() {
    const clientId = '57a03979cd4e40f3b7c17cf12ccced73';
    return `https://oauth.yandex.ru/authorize?response_type=token&client_id=${clientId}&redirect_uri=${this.get('redirect')}`;
  }

  @action
  onClick() {
    window.location = this.get('redirectUrl');
  }
}
