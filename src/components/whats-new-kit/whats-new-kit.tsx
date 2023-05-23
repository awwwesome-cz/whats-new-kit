import {Component, Host, h, Prop, Method} from '@stencil/core';
import {Color, modalController} from "@ionic/core";

export interface WhatsNewKitIcon {
    /**
     * Icon name (Ionic or custom)
     *
     * Example: [Ionicons Custom Icons](https://ionic.io/ionicons/usage#custom-icons)
     * or use [Custom Assets Icons](https://stackoverflow.com/questions/60286018/custom-icons-with-ionic-5)
     */
    name: string;

    /**
     * Ionic color used as ion-icon color attribute
     */
    color?: Color;

    /**
     * Set icon position
     *
     * Default: left
     */
    position?: WhatsNewKitPosition
}

export interface WhatsNewFeature {
    /**
     * Feature Icon (Ionic or custom)
     *
     * Example: [Ionicons Custom Icons](https://ionic.io/ionicons/usage#custom-icons)
     * or use [Custom Assets Icons](https://stackoverflow.com/questions/60286018/custom-icons-with-ionic-5)
     */
    icon: WhatsNewKitIcon,

    /**
     * Feature Title
     */
    title: string;

    /**
     * Feature Description
     */
    text: string;
}

export type WhatsNewKitAlign = 'center' | 'right' | 'left';
export type WhatsNewKitPosition = 'left' | 'above';

export interface WhatsNewKitDescriptionIcon extends Omit<WhatsNewKitIcon, 'position'> {
    /**
     * Align icon
     *
     * Default: center
     */
    align?: WhatsNewKitAlign
}

export interface WhatsNewKitDescription {
    /**
     * Description above Icon (Ionic or custom)
     *
     * Example: [Ionicons Custom Icons](https://ionic.io/ionicons/usage#custom-icons)
     * or use [Custom Assets Icons](https://stackoverflow.com/questions/60286018/custom-icons-with-ionic-5)
     */
    icon?: WhatsNewKitDescriptionIcon;

    /**
     * Informative text to display
     */
    text: string;

    /**
     * Align text
     *
     * Default: center
     */
    align?: WhatsNewKitAlign;


    /**
     * Ionic color used as ion-button color attribute
     */
    color?: Color
}

export interface WhatsNewKitButton {
    /**
     * Button title
     */
    title: string,

    /**
     * Ionic color used as ion-button color attribute
     */
    color?: Color,

    /**
     * Handler Method for custom action
     */
    handler?: () => any;
}

export interface WhatsNewKitFooter {
    /**
     * More button
     */
    more?: WhatsNewKitButton;

    /**
     * Fixed Footer
     *
     * Default: true
     */
    fixed?: boolean

    /**
     * Continue Button
     */
    continue: WhatsNewKitButton;

    /**
     * Informative footer text above buttons
     */
    description?: WhatsNewKitDescription | string;
}

@Component({
    tag: 'whats-new-kit',
    styleUrl: 'whats-new-kit.scss',
    shadow: false,
})
export class WhatsNewKit {
    /**
     * Header of modal
     */
    @Prop() header: string;

    /**
     * Buttons
     */
    @Prop() footer!: WhatsNewKitFooter;

    /**
     * Features
     */
    @Prop() features: WhatsNewFeature[] = [];

    /**
     * Dismiss Modal
     */
    @Method()
    async dismiss() {
        await modalController.dismiss();
    }

    /**
     * Trigger continue button for action
     *
     * Dismissing modal
     */
    @Method()
    async continue() {
        this.footer.continue.handler?.call('continue-handler');

        // check version and save it if needed
        // TODO: capacitor storage
        /*await Storage.set({
            key: 'wnk_app_saved_version',
            value: WhatsNewKit.appVersion ?? '0',
        })*/

        await this.dismiss(); // modalController.dismiss();
    }

    /**
     * Trigger more button for action
     *
     * More button action
     */
    @Method()
    async more() {
        this.footer.more?.handler?.call('more-handler');
    }

    render() {
        return (
            <Host>
                <ion-content class="aw3sm-wnk ion-padding-vertical">
                    <div class="ion-padding-horizontal margin-vertical">
                        <ion-text class="ion-text-center">
                            <h1 class="large-text"><strong innerHTML={this.header}></strong></h1>
                        </ion-text>
                    </div>
                    <ion-list>
                        {this.features.map((feature) => (
                            <ion-item lines="none">
                                <ion-label class="ion-text-wrap">
                                    <ion-row>
                                        <ion-col size={(feature.icon.position == 'above' ? '12' : null) ?? 'auto'}
                                                 class="ion-align-self-center">
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
                    {!(this.footer.fixed ?? true)
                        ?
                        <div class="ion-padding aw3sm-wnk">
                            {this.footerInner()}
                        </div>
                        : null
                    }
                </ion-content>
                {this.footer.fixed ?? true
                    ?
                    <ion-footer class="ion-padding aw3sm-wnk">
                        {this.footerInner()}
                    </ion-footer>
                    : null
                }


            </Host>
        );
    }

    footerInner() {
        return (
            <div>
                {this.footer.description
                    ? typeof this.footer.description == 'string'
                        ? <div class={'ion-text-center'}>
                            <small>
                                <ion-text color={'medium'}>{this.footer.description}</ion-text>
                            </small>
                        </div>
                        :
                        <div>
                            {this.footer.description?.icon
                                ?
                                <div class={'ion-text-' + (this.footer.description?.icon?.align ?? 'center')}>
                                    <ion-icon name={this.footer.description?.icon.name}
                                              size={'large'}
                                              color={this.footer.description?.icon?.color ?? 'primary'}></ion-icon>
                                </div>
                                : null
                            }
                            <div class={'ion-text-' + (this.footer.description.align ?? 'center')}>
                                <small>
                                    <ion-text
                                        color={this.footer.description?.color ?? 'medium'}>{this.footer.description.text}</ion-text>
                                </small>
                            </div>
                        </div>
                    : null}
                {this.footer.more?.title
                    ? <div class="ion-text-center">
                        <ion-button onClick={() => this.more()} fill="clear"
                                    color={this.footer.more?.color}>{this.footer.more?.title}</ion-button>
                    </div> : null}
                <ion-button onClick={() => this.continue()} expand="block"
                            color={this.footer.continue?.color ?? 'primary'}
                            class={'margin-bottom'}>{this.footer.continue.title ?? 'Continue'}</ion-button>
            </div>
        );
    }

}
