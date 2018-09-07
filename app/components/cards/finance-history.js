import Component from '@ember/component';
import {computed} from '@ember-decorators/object';

export default class extends Component {
  pay_history = [
    {time: '1 апреля 23:36', expenses: [
        {provider: 'Ростелеком', service: 'Интернет', cost: 1000},
        {provider: 'ЖКХ', service: 'Горячая вода', cost: 600},
        {provider: 'ЖКХ', service: 'Холодная вода', cost: 500},
      ], @computed('expenses')
    get total() {
        return this.expenses.reduce((prev, cur) => prev + cur.cost, 0);
      }},
    {time: '1 апреля 23:36', expenses: [
        {provider: 'Ростелеком', service: 'Интернет', cost: 1000},
        {provider: 'ЖКХ', service: 'Горячая вода', cost: 600},
        {provider: 'ЖКХ', service: 'Холодная вода', cost: 500},
      ], @computed('expenses')
      get total() {
        return this.expenses.reduce((prev, cur) => prev + cur.cost, 0);
      }},
    {time: '1 апреля 23:36', expenses: [
        {provider: 'Ростелеком', service: 'Интернет', cost: 1000},
        {provider: 'ЖКХ', service: 'Горячая вода', cost: 600},
        {provider: 'ЖКХ', service: 'Холодная вода', cost: 500},
      ], @computed('expenses')
      get total() {
        return this.expenses.reduce((prev, cur) => prev + cur.cost, 0);
      }},
  ];

  start = new Date(2017, 4, 1);
  end = new Date(2017, 4, 11);

  @computed('start', 'end')
  get formatedRange() {
    let formatNumber = (num) => num < 10 ? '0' + num : '' + num;
    let format = (date) => formatNumber(date.getDay()) + '.' + formatNumber(date.getMonth()) + '.' + date.getFullYear();

    return format(this.get('start')) + ' - ' + format(this.get('end'));
  }
}
