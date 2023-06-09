export interface PasteConfig {
	language: string;
	encrypted: boolean;
	expiresAfter: string;
	burnAfterRead: boolean;
}

export interface Paste {
	content: string;
	config: PasteConfig;
	passwordProtected: boolean;
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
