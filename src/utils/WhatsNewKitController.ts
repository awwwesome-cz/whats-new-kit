import {WhatsNewKit, WhatsNewKitFooter, WhatsNewKitFeature} from "../components/whats-new-kit/whats-new-kit";
import {modalController} from "@ionic/core";


export type WhatsNewKitShowConfig = {
    /**
     * Declare APP version
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

export interface WhatsNewKitConfig {
    /**
     * Title of modal
     */
    title: string,

    /**
     * Features
     */
    features: WhatsNewKitFeature[],

    /**
     * Actual app version
     */
    appVersion?: string,

    /**
     * Footer with buttons
     */
    footer: WhatsNewKitFooter,

    presentingElement?: HTMLElement,
    backdropDismiss?: boolean
}

class WhatsNewKitController {
    protected storageKey = 'wnk_app_saved_version';

    /**
     * Hold all features
     *
     * @protected
     */
    protected features: WhatsNewKitFeature[] = [];

    /**
     * Init WNK with modal
     *
     * Run auto check with capacitor or localstorage
     *
     * If app version is bigger then last used (updated), show modal sheet
     */
    public async whatsNew(config: WhatsNewKitConfig) {
        // set features
        this.features = config.features;

        // get version of app
        if (!config.appVersion) {
            config.appVersion = await this.getAppVersion();
        }

        if (await this.canShow({
            appVersion: config.appVersion,
            skipPatchVersion: true
        })) {
            await this._showInfoSheet(config);
        }
    }

    /**
     * Get actual version
     *
     * @private
     */
    async getAppVersion(): Promise<string> {
        // TODO: if use capacitor, get from capacitor
        /*if (Capacitor.getPlatform() !== 'web') {
            version = (await App.getInfo()).version;
        } else {
            version = '1.0'; // web app version must be added by developer
        }*/
        // TODO: get version APP - Ionic.version
        const version = localStorage.getItem(this.storageKey);
        if (version) {
            return Promise.resolve(version);
        }
        return Promise.resolve('1.0.0');
    }

    /**
     * Compare versions & check if WNK can be shown
     *
     * @return Promise<boolean>
     */
    async canShow(config: WhatsNewKitShowConfig): Promise<boolean> {
        WhatsNewKit.appVersion = config.appVersion;
        /* TODO: capacitor storage
        const {value} = await Storage.get({
            key: this.storageKey,
        });*/
        const value = "0.0.0"; // TODO: default app version is 0.0.0
        if (value) {
            const v1 = value.split('.');
            const v2 = WhatsNewKit.appVersion.split('.');

            // minor update
            if (config.skipMinorVersion) {
                if (v1[0] === v2[0]) {
                    return false;
                } else {
                    return value < WhatsNewKit.appVersion;
                }
            }

            // path update
            if (config.skipPatchVersion) {
                if (v1[0] === v2[0] && v1[1] === v2[1]) {
                    return false;
                } else {
                    return value < WhatsNewKit.appVersion;
                }
            }

            // major update
            return value < WhatsNewKit.appVersion;
        } else {
            // new install app
            return true;
        }
    }

    /**
     * Show WhatsNewKit as modal sheet
     *
     * @private
     */
    private async _showInfoSheet(config: WhatsNewKitConfig) {
        const modal = await modalController.create({
            component: "whats-new-kit", // WhatsNewKit
            componentProps: {
                footer: config.footer,
                header: config.title,
                features: this.features,
            },
            backdropDismiss: config.backdropDismiss ?? false,
            // Used for iOS card presenting style (only on iOS), see doc: https://ionicframework.com/docs/api/modal#card-modal
            presentingElement: config.presentingElement ?? null
        });
        return await modal.present();
    }


}

export const whatsNewKitController = new WhatsNewKitController();
