import { Ang4DOIT } from './app.po';

describe('ang4doit App', () => {
  let page: Ang4DOIT;

  beforeEach(() => {
    page = new Ang4DOIT();
  });

  it('should display the navbar correctly', () => {
    page.navigateTo();
    expect(page.getNavbarElement(0)).toEqual('Home');
    expect(page.getNavbarElement(1)).toEqual('Map');
    expect(page.getNavbarElement(2)).toEqual('Login');
    expect(page.getNavbarElement(3)).toEqual('Register');
  });
});
