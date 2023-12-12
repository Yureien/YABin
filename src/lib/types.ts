export interface PasteConfig {
    language?: string;
    encrypted?: boolean;
    expiresAfter?: number;
    burnAfterRead?: boolean;
    customPath?: string;
}

export interface Paste {
    content: string;
    config?: PasteConfig;
    passwordProtected?: boolean;
    initVector?: string;
}

export interface PastePatch {
    key: string;
    content: string;
    encrypted?: boolean;
    initVector?: string;
}

export interface PasteCreateResponse {
    success: boolean;
    data?: {
        key: string;
    };
    error?: string;
}

export interface PastePatchResponse {
    success: boolean;
    data?: {
        key: string;
    };
    error?: string;
}

export interface UserSettings {
    defaults?: {
        encrypted?: boolean;
        burnAfterRead?: boolean;
        expiresAfterSeconds?: number;
    };
}
