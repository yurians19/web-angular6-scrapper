import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="https://techtoserv.com" target="_blank">techtoserv</a></b> 2018</span>
  `,
})
export class FooterComponent {
}
/* <div class="socials">
<a href="#" target="_blank" class="ion ion-social-github"></a>
<a href="#" target="_blank" class="ion ion-social-facebook"></a>
<a href="#" target="_blank" class="ion ion-social-twitter"></a>
<a href="#" target="_blank" class="ion ion-social-linkedin"></a>
</div>
 */