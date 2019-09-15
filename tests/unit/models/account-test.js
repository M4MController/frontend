import {module, test} from 'qunit';
import {setupTest} from 'ember-qunit';

module('Unit | Model | account', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    const store = this.owner.lookup('service:store'); // eslint-disable-line no-invalid-this
    const model = store.createRecord('account', {});
    assert.ok(model);
  });
});
