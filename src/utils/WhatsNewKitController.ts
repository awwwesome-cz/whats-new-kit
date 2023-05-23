import {WhatsNewFeature, WhatsNewKitFooter} from "../components/whats-new-kit/whats-new-kit";
import {modalController, ModalOptions} from "@ionic/core";
import {whatsNewKitConfig} from "./config";


export interface WhatsNewKitShowConfig {
    /**
     * Declare APP version
     */
    appVersion: string;

    /**
     * Last stored version
     */
    storedVersion: string;

    /**
     * Skip patch version 0.0.x
     */
    skipPatchVersion?: boolean;

    /**
     * Skip minor version 0.x.x
     */
    skipMinorVersion?: boolean;
}

export interface WhatsNew {
    /**
     * Actual app version
     *
     * Override global config
     */
    version?: string;

    /**
     * Title of modal
     */
    title: string;

    /**
     * Features
     */
    features: WhatsNewFeature[];

    /**
     * Footer with buttons
     */
    footer: WhatsNewKitFooter;
}

type UnwantedKeys = "component" | "componentProps"

export interface WhatsNewSheetConfig extends Omit<ModalOptions, keyof UnwantedKeys> {
    presentingElement?: HTMLElement;
    backdropDismiss?: boolean;
}

class WhatsNewKitController {
    protected storageKey = 'wnk_app_saved_version';

    /**
     * Hold all features
     *
     * @protected
     */
    protected features: WhatsNewFeature[] = [];

    /**
     * Init WNK with modal
     *
     * Run auto check with capacitor or localstorage
     *
     * If app version is bigger then last used (updated), show modal sheet
     */
    public async whatsNew(whatsNew: WhatsNew, config?: WhatsNewSheetConfig) {
        // set features
        this.features = whatsNew.features;

        // get version of app
        if (!whatsNew.version) {
            whatsNew.version = this.getAppVersion();
        }

        if (await this.canShow({
            appVersion: whatsNew.version,
            storedVersion: whatsNewKitConfig.versionStore,
            skipPatchVersion: whatsNewKitConfig.skipPatch,
            skipMinorVersion: whatsNewKitConfig.skipMinor
        })) {
            await this.show(whatsNew, config);
        }
    }

    /**
     * Get actual version
     *
     * @private
     */
    getAppVersion(): string {
        return whatsNewKitConfig.version;
    }

    /**
     * Compare versions & check if WNK can be shown
     *
     * @return Promise<boolean>
     */
    async canShow(config: WhatsNewKitShowConfig): Promise<boolean> {
        /* TODO: capacitor storage
        const {value} = await Storage.get({
            key: this.storageKey,
        });*/
        const value = config.storedVersion ?? '0.0.0'; // TODO: default app version is 0.0.0
        if (value) {
            const v1 = value.split('.');
            const v2 = config.appVersion.split('.');

            // minor update
            if (config.skipMinorVersion) {
                if (v1[0] === v2[0]) {
                    return false;
                } else {
                    return value < config.appVersion;
                }
            }

            // path update
            if (config.skipPatchVersion) {
                if (v1[0] === v2[0] && v1[1] === v2[1]) {
                    return false;
                } else {
                    return value < config.appVersion;
                }
            }

            // major update
            return value < config.appVersion;
        } else {
            // new install app
            console.log("new app");
            return true;
        }
    }

    /**
     * Show WhatsNewKit as modal sheet
     *
     * @private
     */
    public async show(whatsNew: WhatsNew, config?: WhatsNewSheetConfig) {
        const modal = await modalController.create({
            component: "whats-new-kit", // WhatsNewKit
            componentProps: {
                footer: whatsNew.footer,
                header: whatsNew.title,
                features: whatsNew.features,
            },
            ...config
        });
        return await modal.present();
    }


}

export const whatsNewKitController = new WhatsNewKitController();
