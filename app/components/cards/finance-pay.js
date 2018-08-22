import Component from '@ember/component';

export default class extends Component {
  bills = [
    {
      title: 'Rostelekom',
      subtitle: 'Какой-то текст типо на латыни',
      account: '0123456789',
      elements: [
        {title: 'Элемент 1', price: 1000, controller: '1'},
        {title: 'Элемент 2', price: 2000, controller: '2'},
        {title: 'Элемент 3', price: 3000, controller: '3'},
      ],
      totalPrice: 6000,
      color: 'green',
      opened: true,
    },
    {
      title: 'MGTS',
      subtitle: 'At one point, Stark\'s armor becomes sentient despite fail-safes to prevent its increasingly ' +
        'sophisticated computer systems from doing so. Initially, Stark welcomes this "living" armor for its ' +
        'improved tactical abilities. The armor begins to grow more aggressive, killing indiscriminately and ' +
        'eventually desiring to replace Stark altogether. In the final confrontation on a desert island, Stark ' +
        'suffers another heart attack. The armor sacrifices its own existence to save its creator\'s life, giving up ' +
        'essential components to give Stark a new, artificial heart. This new heart solves Stark\'s health problems, ' +
        'but it ' +
        'does not have an internal power supply, so Stark becomes once again dependent on periodic recharging. The ' +
        'sentient armor incident so disturbs Stark that he temporarily returns to using an unsophisticated early ' +
        'model version of his armor to avoid a repeat incident. He dabbles with using liquid metal circuitry known ' +
        'as S.K.I.N. that forms into a protective shell around his body, but eventually returns to more conventional ' +
        'hard metal armors',
      account: '0123456789',
      elements: [
        {title: 'Элемент 1', price: 3000, controller: '1'},
        {title: 'Элемент 2', price: 3500, controller: '2'},
        {title: 'Элемент 3', price: 3000, controller: '3'},
      ],
      totalPrice: 9500,
      color: '#2f949c',
    },
    {
      title: 'Beeline',
      subtitle: '',
      account: '98765431',
      elements: [
        {title: 'Элемент 1', price: 2000, controller: '1'},
        {title: 'Элемент 2', price: 1000, controller: '2'},
        {title: 'Элемент 3', price: 3000, controller: '3'},
        {title: 'Элемент 4', price: 4000, controller: '3'},
        {title: 'Элемент 6', price: 5000, controller: '3'},
      ],
      totalPrice: 15000,
      color: '#98509a',
    },
  ];
}
