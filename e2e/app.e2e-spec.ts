import { Project4MEANtodosPage } from './app.po';

describe('project4-meantodos App', () => {
  let page: Project4MEANtodosPage;

  beforeEach(() => {
    page = new Project4MEANtodosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
