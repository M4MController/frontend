import Component from '@ember/component';
import {alias} from '@ember/object/computed';
import {className, tagName} from '@ember-decorators/component';

@tagName('span')
export default class extends Component {
  @className @alias('status') statusClassName;
}
