import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { BasePage } from 'src/app/base-page/base-page';
import { Component, Injector, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent extends BasePage implements OnInit {
  constructor(
    injector: Injector,
    private authService: AuthService,
    private router: Router,
    public translate: TranslateService
  ) {
    super(injector);
  }

  ngOnInit() {
    // if (this.authService.getUserToken() && this.authService.getUserDetails()) {
    //   this.router.navigate(['/home']);
    // } else {
    //   this.router.navigate(['/']);
    // }
    this.setupLanguage();
  }

  async setupLanguage() {
    const defaultLang = !!localStorage.getItem('eforest_lang')
      ? localStorage.getItem('eforest_lang')
      : 'en';
    this.translate.setDefaultLang(defaultLang);
    try {
      // const lang = await environment.defaultLang;
      //this.localStorage.setLang(lang);
      this.translate.use(defaultLang);
      //this.preference.lang = lang;
    } catch (error) {
      console.warn(error);
    }
  }
}
