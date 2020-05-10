import Route from '@ember/routing/route';

export default class extends Route {
  pageTitle = 'Мой профиль';

  async model() {
    const store = this.get('store');
    return {
      user: await store.findRecord('user', 1),
      socialTokens: await store.findRecord('user-social-token', 1),
    };
  }
}
