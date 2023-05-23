import {Component, Host, h} from '@stencil/core';
import {WhatsNewFeature} from "../whats-new-kit/whats-new-kit";
import {WhatsNew, whatsNewKitController} from "../../utils/WhatsNewKitController";
import {whatsNewKitConfig} from "../../utils/config";
import {modalController} from "@ionic/core";

@Component({
    tag: 'test-component',
    shadow: true,
})
export class TestComponent {
    private features: WhatsNewFeature[] = [
        {
            icon: {
                name: 'star',
                color: 'warning',
                position: 'above'
            },
            title: 'Showcase your new App Features',
            text: 'Present your new app features just like a native app from <span class="aw3sm-wnk-color ion-color-danger">Apple</span>',
        },
        {
            icon: {
                name: 'color-wand',
                color: 'primary'
            },
            title: 'Automatic Presentation',
            text: 'Simple declare a WhatsNew for actual version and present it automatically by ' +
                'using any ionic <strong>modalController.create() method</strong>.',
        },
        {
            icon: {
                name: 'cog',
                color: 'dark'
            },
            title: 'Configuration',
            text: 'Easily adjust colors, strings and the layout of the presented WhatNewKit Modal page to your needs.',
        },
        {
            icon: {
                name: 'logo-npm',
                color: 'danger'
            },
            title: 'Node Package Manager',
            text: 'WhatsNewKit can by easily integrated with the Node Package Manager.',
        }
    ];

    private halfAutoModal = async () => {
        //
        // Setup global manual
        //

        whatsNewKitConfig.version = "1.1.0"; // app version (from capacitor...)
        whatsNewKitConfig.versionStore = "1.0.0"; // last time saved version (from capacitor...)
        whatsNewKitConfig.skipPatch = true;

        //
        // Custom user action manual
        //

        // Get app version from
        //const appVersion = '1.0.0';
        //await whatsNewKitController.whatsNew(appVersion);
        await whatsNewKitController.whatsNew({
            title: 'WhatsNewKit<br>in <span class="aw3sm-wnk-color ion-color-primary">Multiline</span>',
            features: this.features,
            footer: {
                // description: 'Some features are only available in certain countries and regions.',
                description: {
                    text: 'Some features are only available in certain countries and regions.',
                    icon: {
                        name: 'people-outline',
                    }
                },
                continue: {
                    title: 'Continue',
                    color: 'danger',
                },
                more: {
                    title: 'More about this update',
                    handler: () => {
                        alert('Get more');
                    }
                }
            }
        });
    }

    private open = async () => {
        await this.show({
            title: 'WhatsNewKit<br>in <span class="aw3sm-wnk-color ion-color-primary">Multiline</span>',
            features: [
                {
                    icon: {
                        name: 'star',
                        color: 'warning',
                        position: 'left'
                    },
                    title: 'Showcase your new App Features',
                    text: 'Present your new app features just like a native app from <span class="aw3sm-wnk-color ion-color-danger">Apple</span>',
                },
                {
                    icon: {
                        name: 'color-wand',
                        color: 'primary'
                    },
                    title: 'Automatic Presentation',
                    text: 'Simple declare a WhatsNew for actual version and present it automatically by ' +
                        'using any ionic <strong>modalController.create() method</strong>.',
                }
            ],
            footer: {
                // description: 'Some features are only available in certain countries and regions.',
                description: {
                    text: 'Some features are only available in certain countries and regions.',
                    icon: {
                        name: 'people-outline',
                    }
                },
                continue: {
                    title: 'Continue',
                    color: 'danger',
                },
                more: {
                    title: 'More about this update',
                    handler: () => {
                        alert('Get more');
                    }
                }
            }
        })
    }

    public async show(config: WhatsNew) {
        // use ionic modal controller
        const modal = await modalController.create({
            component: 'whats-new-kit',
            componentProps: {
                footer: config.footer,
                header: config.title,
                features: config.features,
            },
            backdropDismiss: false, // other Ionic modal settings
            // Used for iOS card presenting style (only on iOS), see doc: https://ionicframework.com/docs/api/modal#card-modal
            presentingElement: document.querySelector('.ion-page ion-router-outlet')
        });
        return await modal.present();
    }

    async manualShow() {
        await whatsNewKitController.show({
            title: 'WhatsNewKit<br>in <span class="aw3sm-wnk-color ion-color-primary">Multiline</span>',
            features: [
                {
                    icon: {
                        name: 'star',
                        color: 'warning',
                        position: 'left'
                    },
                    title: 'Showcase your new App Features',
                    text: 'Present your new app features just like a native app from <span class="aw3sm-wnk-color ion-color-danger">Apple</span>',
                },
                {
                    icon: {
                        name: 'color-wand',
                        color: 'primary'
                    },
                    title: 'Automatic Presentation',
                    text: 'Simple declare a WhatsNew for actual version and present it automatically by ' +
                        'using any ionic <strong>modalController.create() method</strong>.',
                }
            ],
            footer: {
                // description: 'Some features are only available in certain countries and regions.',
                description: {
                    text: 'Some features are only available in certain countries and regions.',
                    icon: {
                        name: 'people-outline',
                    }
                },
                continue: {
                    title: 'Continue',
                    color: 'danger',
                },
                more: {
                    title: 'More about this update',
                    handler: () => {
                        alert('Get more');
                    }
                }
            }
        })
    }

    render() {
        return (
            <Host>
                <ion-button onClick={this.halfAutoModal}>Automatic modal</ion-button>
                <ion-button onClick={this.open}>Open modal</ion-button>
                <ion-button onClick={this.manualShow}>Open modal manual</ion-button>
            </Host>
        );
    }

}
