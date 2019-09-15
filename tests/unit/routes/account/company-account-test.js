import {module, test} from 'qunit';
import {setupTest} from 'ember-qunit';

module('Unit | Route | account/company-account', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:account/company-account'); // eslint-disable-line no-invalid-this
    assert.ok(route);
  });
});
