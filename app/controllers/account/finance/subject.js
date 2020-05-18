import Controller from '@ember/controller';
import {computed} from '@ember/object';

export default class extends Controller {
  @computed
  get serviceCompanies() {
    return [];
  }
}
