import Controller from '@ember/controller';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import tsvBuilder from '../../../utils/tsv-builder';
import download from '../../../utils/download';

export default class extends Controller {
  @service backend;

  @action
  async onControllerDeleteAction(controller) {
    try {
      controller.deleteRecord();
      await controller.save();

      // a controller with the same identifier may be activated in the same browser session in the future.
      // we must unload the record, not to get an Ember error on controller creation (in fact, activation).
      controller.unloadRecord();
    } catch (e) {
      alert(`Не могу удалить объект: ${e.toString()}`);
    }
  }

  downloadData(sensor) {
    return this.get('backend').request(`/sensor/${sensor.get('id')}/data`, 'GET');
  }

  @action
  async downloadRawData(sensor) {
    const data = await this.downloadData(sensor);
    download(
      tsvBuilder(
        ['data', 'sign', 'signer'],
        data,
      ),
      `${new Date().toLocaleString('ru-ru')}-raw.tsv`,
      'text/tab-separated-values',
    );
  }

  @action
  async downloadPrettyData(sensor) {
    let data = (await this.downloadData(sensor)).filter((row) => row.data && row.data.timestamp && row.data.value).
      map((row) => row.data);

    const normalized = [];

    // normalize
    for (const row of data) {
      if (!row) continue;
      if (typeof row.value !== 'object') {
        row.value = {value: row};
      }

      const obj = {};
      for (let [field, value] of Object.entries(row.value)) {
        if (typeof value === 'string') {
          const splited = value.split(' ');
          if (splited.length === 2) {
            const parsed = parseFloat(splited[0]);
            if (!isNaN(parsed)) {
              const unit = splited.splice(1).join(' ');
              field += ` (${unit})`;
              value = parsed;
            }
          }
        }

        obj[field] = value;
      }

      normalized.push({timestamp: row.timestamp, ...obj});
    }

    data = null;

    const headers = [];
    for (const row of normalized) {
      for (const header of Object.keys(row)) {
        if (!headers.includes(header)) {
          headers.push(header);
        }
      }
    }

    download(
      tsvBuilder(
        headers,
        normalized,
      ),
      `${new Date().toLocaleString('ru-ru')}-pretty.tsv`,
      'text/tab-separated-values',
    );
  }
}
