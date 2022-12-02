import {Component, Host, h} from '@stencil/core';
import {WhatsNewKitFeature} from "../whats-new-kit/whats-new-kit";
import {whatsNewKitController} from "../../utils/WhatsNewKitController";

@Component({
    tag: 'test-component',
    shadow: true,
})
export class TestComponent {
    private features: WhatsNewKitFeature[] = [
        {
            icon: {
                name: 'star',
                color: 'warning'
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
            title: 'NPM Manager',
            text: 'WhatsNewKit can by easily integrated vie the Swift Package Manager.',
        }
    ];

    private openModal = async () => {
        // Get app version from
        //const appVersion = '1.0.0';
        //await whatsNewKitController.whatsNew(appVersion);
        await whatsNewKitController.whatsNew({
            title: 'WhatsNewKit<br>in <span class="aw3sm-wnk-color ion-color-primary">Multiline</span>',
            features: this.features
        });
    }

    render() {
        return (
            <Host>
                <ion-button onClick={this.openModal}>Otevřít modal</ion-button>
            </Host>
        );
    }

}