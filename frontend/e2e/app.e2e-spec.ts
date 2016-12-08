import { CategoryManagerPage } from './app.po';

describe('category-manager App', function() {
  let page: CategoryManagerPage;

  beforeEach(() => {
    page = new CategoryManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
