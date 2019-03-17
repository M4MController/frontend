import ApplicationSerializer from './application';

export default class extends ApplicationSerializer {
  attrs = {
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

  normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
    payload = {
      user: Object.assign(payload['msg'], {id: 1}),
    };
    return super.normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType);
  }
}
