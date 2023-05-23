## Types of presentation

- [Manual Presentation](#manual-presentation)
- [Half Automatic Presentation](#half-automatic-presentation)
- [Full Automatic Presentation](#full-automatic-presentation) - Note: not completed yet

## Usage

### Manual Presentation

1. Setup `whatsNewKitConfig` on any app startup event in lifecycle.
2. Define `WhatsNew` (with features recommend 4-5 max for small screen not good for UX, user need to scroll).
3. Show `Ionic modal (modalController)` with `WhatsNewKitComponent` or use manual
   method `await whatsNewKitController.show({})`.

#### Manual - with custom Modal Controller

```typescript
class AnyPage {
    async show() {
        await this.openModal({
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

    public async openModal(config: WhatsNew) {
        // use ionic modal controller
        const modal = await modalController.create({
            component: 'whats-new-kit', // Or in Angular WhatsNewKit
            componentProps: {
                // Also you cand declare data there without config method atrribute
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
}
```

#### Manual - with `whatsNewKitController.show()`

```typescript
class AnyPage {
    async show() {
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
}
```

### Half-Automatic Presentation

1. Setup global options (versions & skip detection)
2.

```typescript

class AnyPage {

    /**
     * Register global data before calling autoShow()
     * @protected
     */
    protected viewWillLoad() {
        //
        // Setup global manual
        //

        whatsNewKitConfig.version = "1.1.0"; // app version (from capacitor...)
        whatsNewKitConfig.versionStore = "1.0.0"; // last time saved version (from capacitor...)
        whatsNewKitConfig.skipPatch = true;

        // ... other code

        // Run auto detection
        this.autoShow();
    }

    private autoShow = async () => {
        await whatsNewKitController.whatsNew({
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
        });
    }
}
```

### Full-Automatic Presentation

> Not implemented yet! Waiting for implementing handlers for detect data from storage. Will be
> like `Half-Automatic Presentation`


