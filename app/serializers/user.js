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
      user: Object.assign(payload, {id: 1}),
    };
    return super.normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType);
  }

  serialize(snapshot) {
    const json = {};

    snapshot.eachAttribute((key) => {
      // костыль, чтобы не отсылались null'ы на бек.
      // ситуация интересная: бекенд нам присылает null в полях юзера, а обратно забирать их не хочет, гововит 4xx
      const value = snapshot.attr(key);
      if (value !== null) {
        json[this.attrs[key] || key] = value;
      }
    });

    return json;
  }
}
