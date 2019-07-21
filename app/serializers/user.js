import ApplicationSerializer from './application';
import {IS_LITE_MODE} from '../constants';

const attrs = {
  firstName: 'name',
  middleName: 'family_name',
  lastName: 'second_name',
  registrationAddress: 'registration_addres',
  mailingAddress: 'mailing_addres',
  birthday: 'birth_day',
  email: 'e_mail',
  homePhone: 'home_phone',
  mobilePhone: 'mobile_phone',
  issuedBy: 'issued_by',
  divisionNumber: 'division_number',
  sex: 'sex',
  companies: {serialize: false},
};

const DefaultUserSerializer = class extends ApplicationSerializer {
  attrs = attrs;

  normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
    payload = {
      user: Object.assign(payload, {id: 1}),
    };
    return super.normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType);
  }
};

const LiteUserSerializer = class extends ApplicationSerializer {
  attrs = attrs;
};

export default IS_LITE_MODE ? LiteUserSerializer : DefaultUserSerializer;
