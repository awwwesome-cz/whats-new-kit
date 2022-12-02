import {Component, Host, h, Prop} from '@stencil/core';
import {modalController} from "@ionic/core";


export type WhatsNewKitFeature = {
    icon: {
        name: string;
        color?: string;
    },
    title: string;
    text: string;
};

@Component({
    tag: 'whats-new-kit',
    styleUrl: 'whats-new-kit.scss',
    shadow: false,
})
export class WhatsNewKit {

    static appVersion?: string;

    @Prop() title: string;

    @Prop() buttons: {
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

    @Prop() features: WhatsNewKitFeature[] = [];

    async continue() {
        this.buttons.continue.handler?.call('continue-handler');

        // check version and save it if needed
        // TODO: capacitor storage
        /*await Storage.set({
            key: 'wnk_app_saved_version',
            value: WhatsNewKit.appVersion ?? '0',
        })*/

        await modalController.dismiss();
    }

    more() {
        this.buttons.more?.handler?.call('more-handler');
    }

    render() {
        return (
            <Host>
                <ion-content class="aw3sm-wnk ion-padding-vertical">
                    <div class="ion-padding-horizontal margin-vertical">
                        <ion-text class="ion-text-center">
                            <h1 class="large-text"><strong innerHTML={this.title}></strong></h1>
                        </ion-text>
                    </div>
                    <ion-list>
                         {this.features.map((feature) => (
                            <ion-item lines="none">
                                <ion-label class="ion-text-wrap">
                                    <ion-row>
                                        <ion-col size="auto" class="ion-align-self-center">
                                            <ion-icon name={feature.icon.name} color={feature.icon?.color}
                                                      class="large-icon"></ion-icon>
                                        </ion-col>
                                        <ion-col>
                                            <ion-text>
                                                <strong innerHTML={feature.title}></strong>
                                            </ion-text>
                                            <div innerHTML={feature.text}>
                                            </div>
                                        </ion-col>
                                    </ion-row>
                                </ion-label>
                            </ion-item>
                        ))}
                    </ion-list>
                </ion-content>
                <ion-footer class="ion-padding aw3sm-wnk">
                    {this.buttons.more?.title
                        ? <div class="ion-text-center">
                            <ion-button onClick={this.more} fill="clear"
                                        color={this.buttons.more?.color}>{this.buttons.more?.title}</ion-button>
                        </div> : null}
                    <ion-button onClick={this.continue} expand="block" color={this.buttons.continue?.color ?? 'primary'}
                                class={'margin-bottom'}>{this.buttons.continue.title ?? 'zavřít'}</ion-button>
                </ion-footer>
            </Host>
        );
    }

}
