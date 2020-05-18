import {get} from '@ember/object';
import ApplicationSerializer from './application';
import DS from 'ember-data';

export default class extends ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {}) {
  attrs = {
    name: 'name',
    deactivationDate: 'deactivation_date',
    company: 'company',
    activationDate: 'activation_date',
    controller: 'controller_id',
  };

  normalize(modelClass, resourceHash) {
    const type = get(resourceHash, 'characteristics.sensor_type') || get(resourceHash, 'type');

    const additional = {
      type,
      charge: get(resourceHash, 'payments.charge'),
      overpayment: get(resourceHash, 'payments.overpayment'),
      forPayment: get(resourceHash, 'payments.for_payment'),
      unitName: get(resourceHash, 'characteristics.unit_of_measurement'),
      lastValue: get(resourceHash, 'last_value'),
      valueMonth: get(resourceHash, 'stats.month'),
      valuePrevYear: get(resourceHash, 'stats.prev_month'),
      valuePrevYearAverage: get(resourceHash, 'stats.prev_year'),
      serviceCompany: get(resourceHash, 'finance.service_company'),
    };

    return super.normalize(modelClass, Object.assign(resourceHash, additional));
  }

  serialize(snapshot) {
    const json = {};

    snapshot.eachAttribute((key) => {
      // костыль, чтобы не отсылались null'ы на бек.
      // ситуация интересная: бекенд нам присылает null в полях сенсора, а обратно забирать их не хочет, гововит 4xx
      const value = snapshot.attr(key);
      if (value !== null) {
        json[this.attrs[key] || key] = value;
      }
    });

    snapshot.eachRelationship((key, value) => {
      if (value.meta.kind === 'belongsTo') {
        const rel = snapshot.belongsTo(key);
        json[`${key}_id`] = rel && +rel.id;
      }
    });

    return json;
  }
}
