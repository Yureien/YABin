export interface PasteConfig {
	language?: string;
	encrypted?: boolean;
	expiresAfter?: number;
	burnAfterRead?: boolean;
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
	error?: {
		message: string;
		code: number;
	};
}

export interface PastePatchResponse {
	success: boolean;
	data?: {
		key: string;
	};
	error?: string;
}
