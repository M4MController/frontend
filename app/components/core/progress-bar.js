import Component from '@ember/component';
import {computed} from '@ember-decorators/object';
import {attribute} from '@ember-decorators/component';

export default class extends Component {
  defaultAttrs = {
    min: 0,
    value: 70,
    max: 100,
    color: '#567ba7',
    background: '#ccc',
  };

  @attribute
  @computed('min', 'max', 'color', 'background')
  get style() {
    const max = +this.getAttr('max');
    const min = +this.getAttr('min');
    const value = +this.getAttr('value');
    const color = this.getAttr('color');
    const background = this.getAttr('background');

    const percent = (value - min) * 100 / (max - min);
    return `background: linear-gradient(to right, ${color} ${percent}%, ${background} ${percent}%)`.htmlSafe();
  }
}
