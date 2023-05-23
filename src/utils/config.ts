
class WhatsNewKitConfig {

    /**
     * Actual version of App
     *
     * Get from Capacitor and set it here if you want
     *
     * @private
     */
    private _version?: string;
    private _versionStore?: string;
    private _skipPatch?: boolean = false;
    private _skipMinor?: boolean = false;

    get skipMinor(): boolean {
        return this._skipMinor;
    }

    set skipMinor(value: boolean) {
        this._skipMinor = value;
    }
    get skipPatch(): boolean {
        return this._skipPatch;
    }

    set skipPatch(value: boolean) {
        this._skipPatch = value;
    }
    get versionStore(): string {
        return this._versionStore;
    }

    set versionStore(value: string) {
        this._versionStore = value;
    }

    /**
     * Actual version of App
     *
     * @return String version in X.Y.Z (Main.Minor.Patch)
     */
    get version(): string {
        return this._version;
    }

    /**
     * Actual version of App
     *
     * Get from Capacitor and set it here if you want
     *
     * @param value String version in X.Y.Z (Main.Minor.Patch)
     */
    set version(value: string) {
        this._version = value;
    }



}

export const whatsNewKitConfig = new WhatsNewKitConfig();

