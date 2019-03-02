import Ember from 'ember';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  loadAttrsHash: Ember.on('didReceiveAttrs', function() {
    const hash = this.get('params'); // eslint-disable-line no-invalid-this
    hash && Object.keys(hash).forEach((key) => this.set(key, hash[key])); // eslint-disable-line no-invalid-this
  }),
});
