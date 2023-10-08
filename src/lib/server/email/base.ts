import nodemailer from 'nodemailer';
import {
	MAIL_ENABLED,
	MAIL_SERVER,
	MAIL_PASSWORD,
	MAIL_PORT,
	MAIL_USERNAME,
	MAIL_USE_SSL,
	MAIL_FROM
} from '$env/static/private';

export async function sendEmail(to: string, subject: string, content: string) {
	if (MAIL_ENABLED !== 'true') {
		return false;
	}

	const transporter = nodemailer.createTransport({
		host: MAIL_SERVER,
		port: Number(MAIL_PORT),
		secure: MAIL_USE_SSL === 'true',
		auth: {
			user: MAIL_USERNAME,
			pass: MAIL_PASSWORD
		}
	});

	const info = await transporter.sendMail({
		from: MAIL_FROM,
		to,
		subject,
		text: content
	});

	if (info.accepted.length === 0) {
		return false;
	}

	return true;
}
