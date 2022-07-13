import { NgModule } from '@angular/core';
import { WhatsNewKitComponent } from './whats-new-kit.component';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    WhatsNewKitComponent
  ],
    imports: [
        IonicModule,
        CommonModule
    ],
  exports: [
    WhatsNewKitComponent
  ]
})
export class WhatsNewKitModule { }
