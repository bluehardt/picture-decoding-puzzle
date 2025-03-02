import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pictureDecodingPuzzle';

  constructor(translate: TranslateService, authService: AuthService) {
    translate.setDefaultLang('en');
    translate.use('en');

    authService.init();
  }
}
