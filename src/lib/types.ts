export interface PasteConfig {
	language: string;
	encrypted: boolean;
	expiresAfter: string;
	burn: boolean;
}

export interface Paste {
	content: string;
	config: PasteConfig;
	passwordProtected: boolean;
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
