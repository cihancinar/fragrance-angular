import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../authentication/auth.service";
import {KeycloakProfile, KeycloakTokenParsed} from "keycloak-js";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent {
  title = 'Fragrance';
  token: KeycloakTokenParsed | undefined;
  user: Promise<KeycloakProfile>;

  constructor(private authService: AuthService) {
    this.token = this.authService.getLoggedUser();
    this.user = this.authService.loadUserProfile();
  }

  get isLoggedIn(): Promise<boolean> {
    return this.authService.isLoggedIn().then((l) => {
      return l;
    });
  }

  logout() {
    this.authService.logout();
  }

  redirectToProfile() {
    this.authService.redirectToProfile();
  }

  toggleSidebarOpen() {

  }
}
