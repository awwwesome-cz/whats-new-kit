import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Storage} from "@capacitor/storage";

export type WhatsNewKitFeature = {
  icon: {
    name: string;
    color?: string;
  },
  title: string;
  text: string;
};

type ShowConfig = {
  /**
   * Declare if it can be show on web
   */
  appVersion: string,
  /**
   * Skip patch version 0.0.x
   */
  skipPatchVersion?: boolean,
  /**
   * Skip minor version 0.x.x
   */
  skipMinorVersion?: boolean
}

@Component({
  selector: 'aw3sm-whats-new-kit',
  templateUrl: 'whats-new-kit.component.html',
  styleUrls: [
    'whats-new-kit.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class WhatsNewKitComponent implements OnInit {

  constructor(
    private modalController: ModalController,
  ) {
  }

  static appVersion?: string;

  @Input() title!: string;

  @Input() buttons!: {
    more?: {
      title: string,
      color?: string,
      handler?: () => string;
    };
    continue: {
      title: string,
      color?: string,
      handler?: () => string;
    };
  };

  @Input() features: WhatsNewKitFeature[] = [];

  /**
   * Compare versions & check if WNK can be shown
   *
   * @return Promise<boolean>
   */
  static async canShow(config: ShowConfig): Promise<boolean> {
    WhatsNewKitComponent.appVersion = config.appVersion;
    const {value} = await Storage.get({
      key: 'wnk_app_saved_version',
    });
    if (value) {
      const v1 = value.split('.');
      const v2 = WhatsNewKitComponent.appVersion.split('.');

      // minor update
      if (config.skipMinorVersion) {
        if (v1[0] === v2[0]) {
          return false;
        } else {
          return value < WhatsNewKitComponent.appVersion;
        }
      }

      // path update
      if (config.skipPatchVersion) {
        if (v1[0] === v2[0] && v1[1] === v2[1]) {
          return false;
        } else {
          return value < WhatsNewKitComponent.appVersion;
        }
      }

      // major update
      return value < WhatsNewKitComponent.appVersion;
    } else {
      // new install app
      return true;
    }
  }

  ngOnInit() {
  }

  async continue() {
    // @ts-ignore
    this.buttons.continue.handler?.call('continue-handler');

    // check version and save it if needed
    await Storage.set({
      key: 'wnk_app_saved_version',
      value: WhatsNewKitComponent.appVersion ?? '0',
    })

    await this.modalController.dismiss();
  }

  more() {
    // @ts-ignore
    this.buttons.more?.handler?.call('more-handler');
  }
}
