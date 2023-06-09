import base64 from 'base64-js';

export async function encrypt(plaintext: string) {
	const encoder = new TextEncoder();

	const iv: Uint8Array = crypto.getRandomValues(new Uint8Array(12));
	const ivStr = base64.fromByteArray(iv);

	const alg = { name: 'AES-GCM', iv, length: 256 };

	const key = (await crypto.subtle.generateKey(alg, true, ['encrypt'])) as CryptoKey;
	const keyStr = base64.fromByteArray(new Uint8Array(await crypto.subtle.exportKey('raw', key)));
	const enc = await crypto.subtle.encrypt(alg, key, encoder.encode(plaintext));
	const encStr = base64.fromByteArray(new Uint8Array(enc));

	return [encStr, `${ivStr};${keyStr}`];
}

export async function decrypt(ciphertext: string, ivKey: string) {
	const decoder = new TextDecoder('utf-8');

	const [ivStr, keyStr] = ivKey.split(';');
	const iv = base64.toByteArray(ivStr);
	const alg = { name: 'AES-GCM', iv, length: 256 };

	const key = await crypto.subtle.importKey('raw', base64.toByteArray(keyStr), alg, false, [
		'decrypt'
	]);

	const dec = await crypto.subtle.decrypt(alg, key, base64.toByteArray(ciphertext));
	return decoder.decode(dec);
}

export async function encryptWithPassword(plaintext: string, password: string) {
	const encoder = new TextEncoder();

	const iv: Uint8Array = crypto.getRandomValues(new Uint8Array(12));
	const ivStr = base64.fromByteArray(iv);
	const alg = { name: 'AES-GCM', iv, length: 256 };

	const keyMaterial = await crypto.subtle.importKey(
		'raw',
		encoder.encode(password),
		'PBKDF2',
		false,
		['deriveBits', 'deriveKey']
	);
	const key = await crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt: await crypto.subtle.digest('SHA-256', encoder.encode(password)),
			iterations: 100000,
			hash: 'SHA-256'
		},
		keyMaterial,
		alg,
		false,
		['encrypt']
	);
	const enc = await crypto.subtle.encrypt(alg, key, encoder.encode(plaintext));
	const encStr = base64.fromByteArray(new Uint8Array(enc));

	return [encStr, ivStr];
}

export async function decryptWithPassword(ciphertext: string, iv: string, password: string) {
	const encoder = new TextEncoder();
	const decoder = new TextDecoder('utf-8');

	const alg = { name: 'AES-GCM', iv: base64.toByteArray(iv), length: 256 };

	const keyMaterial = await crypto.subtle.importKey(
		'raw',
		encoder.encode(password),
		'PBKDF2',
		false,
		['deriveBits', 'deriveKey']
	);

	const key = await crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt: await crypto.subtle.digest('SHA-256', encoder.encode(password)),
			iterations: 100000,
			hash: 'SHA-256'
		},
		keyMaterial,
		alg,
		false,
		['decrypt']
	);

	const dec = await crypto.subtle.decrypt(alg, key, base64.toByteArray(ciphertext));
	return decoder.decode(dec);
}
