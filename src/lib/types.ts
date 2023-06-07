export interface PasteConfig {
	type: string;
	encrypted: boolean;
	expiresAfter: string;
	burn: boolean;
	password: string;
}

export interface Paste {
	content: string;
	config: PasteConfig;
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
