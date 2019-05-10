import Component from '@ember/component';
import {action} from '@ember/object';

const cards = [
  {
    bankName: 'Банк1',
    number: '1111 2222 3333 4444',
  },
  {
    bankName: 'Банк2',
    number: '1111 2222 3333 4444',
  },
  {
    bankName: 'Банк3',
    number: '1111 2222 3333 4444',
  },
  {
    bankName: 'Банк4',
    number: '1111 2222 3333 4444',
  },
  {
    bankName: 'Банк5',
    number: '1111 2222 3333 4444',
  },
  {
    bankName: 'Банк6',
    number: '1111 2222 3333 4444',
  },
  {
    bankName: 'Банк7',
    number: '1111 2222 3333 4444',
  },
  {
    bankName: 'Банк8',
    number: '1111 2222 3333 4444',
  },
];

export default class extends Component {
  cards = cards;

  @action
  addCard() {
  }
}
