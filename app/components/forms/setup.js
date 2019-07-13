import Component from '@ember/component';
import {action} from '@ember/object';


export default class extends Component {
  hello = '';

  @action
  onSetupLocalAction() {
    this.attrs.onSetupLocal();
  }

  @action
  onSetupM4MAction() {
    this.attrs.onSetupM4M();
  }
}
