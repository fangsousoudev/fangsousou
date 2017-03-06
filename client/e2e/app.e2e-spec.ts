import { FangsousouPage } from './app.po';

describe('fangsousou App', function() {
  let page: FangsousouPage;

  beforeEach(() => {
    page = new FangsousouPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
