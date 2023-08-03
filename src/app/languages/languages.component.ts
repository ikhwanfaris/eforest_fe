import { ModalController } from '@ionic/angular';
import { Component, Injector, OnInit } from '@angular/core';
import languages from '../static/languages.json';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent extends BasePage implements OnInit {
  languageList = languages;
  modal: HTMLElement;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.languageList.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
  }

  onDismiss() {
    this.modalCtrl.dismiss();
  }

  async changeLang(lang) {
    try {
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      window.localStorage.setItem('eforest_lang', lang);
      this.showToast(
        await this.getTrans('LANG_UPDATE_SUCCESS'),
        3000,
        'top',
        'success'
      );
      this.onDismiss();
    } catch (e) {
      this.showToast(
        await this.getTrans('LANG_UPDATE_FAIL'),
        3000,
        'top',
        'error'
      );
      this.onDismiss();
    }
  }
}
