import { browser, by, element } from 'protractor';

export class Project4MEANtodosPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
