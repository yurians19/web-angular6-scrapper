import { Component, Input, OnInit,Inject } from '@angular/core';

import { NbMenuService, NbSidebarService,NB_WINDOW } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/data/layout.service';
import { filter, map } from 'rxjs/operators';
import { NbAuthJWTToken, NbAuthService,NbTokenService } from '@nebular/auth';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out',link: '/auth/login' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private tokenService: NbTokenService,
              private analyticsService: AnalyticsService,
              private authService: NbAuthService,
              @Inject(NB_WINDOW) private window,
              private layoutService: LayoutService) {

                this.authService.onTokenChange()
                    .subscribe((token: NbAuthJWTToken) => {
                      if (token.isValid()) {
                        this.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable 
                      }

                    });
  }

  ngOnInit() {
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title === 'Log out') {
          localStorage.removeItem('auth_app_token');
          console.log(this.tokenService.get())
        } /* else
          this.window.alert(`${title} was clicked!`) */
      }
        
         );

    /* this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick); */
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
