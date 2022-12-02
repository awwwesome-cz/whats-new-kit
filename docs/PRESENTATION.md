## Types of presentation

- [Manual Presentation](#manual-presentation)
- [Automatic Presentation](#automatic-presentation)
## Usage

### Manual Presentation

1. Define features (WNK recommend 4-5 max for small screen not good for UX, user need to scroll).
2. Adding `ModalController` service.
3. Show `Ionic modal (modalController)` with `WhatsNewKitComponent`.

In `modalController.create()` you need to add componentProps and set all what you want to show on WNK page.

```typescript
export class ExamplePage {
    /**
     * Define your features
     *
     * @protected
     */
    protected features: WhatsNewKitFeature[] = [
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

    constructor(
        protected modalController: ModalController,
    ) {
    }

    /**
     * Show WhatsNewKit as modal sheet
     */
    async showUpdateInfoSheet() {
        const modal = await this.modalController.create({
            component: WhatsNewKitComponent,
            componentProps: {
                buttons: {
                    continue: {
                        title: 'Continue',
                        color: 'danger'
                        // additionally you can add custom handler, default capacitor.storage & canShow() check won't override!
                        // handler: () => {
                        //   alert('Get more');
                        // }
                    },
                    /*more: {
                      title: 'More about this update',
                      handler: () => {
                        alert('Get more');
                      }
                    }*/
                },
                title: 'WhatsNewKit<br>in <span class="aw3sm-wnk-color ion-color-primary">Multiline</span>',
                features: this.features,
            },
            backdropDismiss: false, // other Ionic modal settings
            // Used for iOS card presenting style (only on iOS), see doc: https://ionicframework.com/docs/api/modal#card-modal
            presentingElement: document.querySelector('.ion-page ion-router-outlet')
        });
        return await modal.present();
    }
}
```

#### Get version of your app

You can use our `WhatsNewKitController` with several methods to get data.

- `canShow(config: ShowConfig): Promise<boolean>` - you can get actual state when you need to show action sheet. `true` means you can show. 
- `getAppVersion(): Promise<string>` - get actual App version. **⚠️ Not available for web!** 

### Automatic Presentation

1. Define features (WNK recommend 4-5 max for small screen not good for UX, user need to scroll).
2. Adding `WhatsNewKitController` service.
3. Call `whatsNewKitController.init()` for automatic show. Also, you can customize init config.

```typescript

export class ExamplePage {
    /**
     * Define your features
     *
     * @protected
     */
    protected features: WhatsNewKitFeature[] = [
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

    constructor(
        protected whatsNewKitController: WhatsNewKitController,
    ) {
    }

    /**
     * Show WhatsNewKit as modal sheet automaticcaly
     */
    async showUpdateInfoSheet() {
        await whatsNewKitController.init({
            features: this.features
        });
    }
}
```

