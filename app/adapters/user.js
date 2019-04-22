import ApplicationAdapter from './application';
import {IS_LITE_MODE} from '../constants';

const DefaultUserAdapter = class extends ApplicationAdapter {
  buildUrlFindAll() {
    return '/user/user_info';
  }

  buildUrlFindRecord() {
    return '/user/user_info';
  }
};

const LiteUserAdapter = class extends ApplicationAdapter {
  findRecord(store, type, id) {
    return {
      'users': {
        'id': id,
        'family_name': 'Васильевич',
        'name': 'Василий',
        'second_name': 'Васильев',
        'date_receiving': 156,
        'issued_by': '1961-06-16',
        'division_number': 'DIVNUM',
        'registration_addres': 'Эстония, г. Маарду',
        'mailing_addres': 'бауманские общаги',
        'birth_day': '156',
        'sex': false,
        'home_phone': '111 555',
        'mobile_phone': '8 800 555 35 35',
        'citizenship': 'не определено',
        'e_mail': 'ml@gmail.com',
      },
    };
  }
};

export default IS_LITE_MODE ? LiteUserAdapter : DefaultUserAdapter;
