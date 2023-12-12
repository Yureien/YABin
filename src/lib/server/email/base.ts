import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

export async function sendEmail(to: string, subject: string, content: string) {
    if (env.MAIL_ENABLED !== 'true') {
        return false;
    }

    const transporter = nodemailer.createTransport({
        host: env.MAIL_SERVER,
        port: Number(env.MAIL_PORT),
        secure: env.MAIL_USE_SSL === 'true',
        auth: {
            user: env.MAIL_USERNAME,
            pass: env.MAIL_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: env.MAIL_FROM,
        to,
        subject,
        text: content,
    });

    if (info.accepted.length === 0) {
        return false;
    }

    return true;
}
