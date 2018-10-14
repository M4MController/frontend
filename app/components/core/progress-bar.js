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
    const max = +this.get('max');
    const min = +this.get('min');
    const value = +this.get('value');
    const color = this.get('color');
    const background = this.get('background');

    const percent = (value - min) * 100 / (max - min);
    return `background: linear-gradient(to right, ${color} ${percent}%, ${background} ${100 -
    percent}%)`.htmlSafe();
  }
}
