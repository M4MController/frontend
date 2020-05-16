import Route from '@ember/routing/route';

export default class extends Route {
  model(params) {
    const companyId = params['company_id'];

    const sensors = this.get('store').peekAll('sensor').filterBy('typeName', 'obd');

    return {
      company: this.get('store').peekRecord('company', companyId),
      clients: [
        {
          status: '7/10',
          model: 'Mercedes-Benz',
          ownerName: 'Строганов Юрий Васильевич',
          ownerPhone: '+7916826782',
        }, {
          status: '4/10',
          model: 'Porshe 777',
          ownerName: 'Куров Андрей Владимирович',
          ownerPhone: '+74955553535',
        }, {
          status: '10/10',
          model: 'BMW 7',
          ownerName: 'Рудаков Игорь Владимирович',
          ownerPhone: '+7999777777',
        }, {
          status: '2/10',
          model: 'Lada Kalina',
          ownerName: 'Рязанова Наталия Юрьевна',
          ownerPhone: '+74957846248',
        }, {
          status: '9/10',
          model: 'Mazda 3',
          ownerName: 'Тихомирова Елизавета Алексеевна',
          ownerPhone: '+74957846248',
        },
      ],
      sensors,
    };
  }
}
