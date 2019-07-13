import Component from '@ember/component';
import {action, computed, get} from '@ember/object';

export default class extends Component {
  sortColumn;
  sortAsc = true;

  @action
  onHeadClick(column) {
    if (this.get('sortColumn') === column) {
      if (this.get('sortAsc')) {
        this.set('sortAsc', false);
      } else {
        this.set('sortColumn', null);
      }
    } else {
      this.set('sortColumn', column);
      this.set('sortAsc', true);
    }
  }

  @computed('data', 'sortColumn', 'sortAsc')
  get sortedData() {
    let data = this.get('data');
    const sortColumn = this.get('sortColumn');

    if (!sortColumn) {
      return data;
    }

    data = data.sortBy(`${get(sortColumn, 'path')}`);
    if (!this.get('sortAsc')) {
      data = data.reverse();
    }
    return data;
  }
}
