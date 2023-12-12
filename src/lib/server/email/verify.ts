import { env } from '$env/dynamic/public';
import prisma from '@db';
import { generateVerificationHash } from '../auth';
import { sendEmail } from './base';

export const sendVerificationEmail = async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return false;

    const hash = await generateVerificationHash(userId);

    const verifyUrl = `${env.PUBLIC_URL}/validate?hash=${encodeURIComponent(
        hash,
    )}&userId=${encodeURIComponent(userId)}`;

    const content = `To verify your email, please click the following link: ${verifyUrl}`;
    const subject = 'YABin: Verify your email';

    const sent = await sendEmail(user.email, subject, content);
    if (!sent) return false;

    return true;
};
