import { $$, browser } from 'protractor';

export class Ang4DOIT {
  navigateTo() {
    return browser.get('/');
  }

  getNavbarElement(n) {
    return $$('app-root a').get(n).getText();
  }

}
