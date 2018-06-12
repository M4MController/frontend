/* eslint-disable no-invalid-this */

export default function() {
  [
    ['user', ['objects']],
    ['object', ['user', 'controllers']],
    ['controller', ['object', 'sensors']],
    ['sensor', ['controller', 'data']],
    ['data', 'sensor'],
  ].forEach(([type, relations]) => {
    this.get(`/${type}`);
    this.get(`/${type}/:id`);

    if (relations) {
      for (let relation of relations) {
        this.get(`/${type}/:id/relationships/${relation}`);
      }
    }
  });
}
