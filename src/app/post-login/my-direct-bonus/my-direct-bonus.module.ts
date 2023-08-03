import { IonicModule } from '@ionic/angular';
import { MyDirectBonusComponent } from './my-direct-bonus.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MyDirectBonusComponent],
  imports: [CommonModule, IonicModule,TranslateModule],
  exports: [MyDirectBonusComponent, TranslateModule],
})
export class MyDirectBonusModule {}
