import { env } from '$env/dynamic/public';
import prisma from '@db';
import { generatePasswordResetToken } from '../auth';
import { sendEmail } from './base';

export const sendResetEmail = async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return false;

    const resetToken = await generatePasswordResetToken(userId);

    const verifyUrl = `${
        env.PUBLIC_URL
    }/reset-password?token=${encodeURIComponent(
        resetToken,
    )}&userId=${encodeURIComponent(userId)}`;

    const content = `To reset your password, please click the following link: ${verifyUrl}

If you did not make this request, please disgregard this email.`;

    const subject = 'YABin: Password reset request';

    const sent = await sendEmail(user.email, subject, content);
    if (!sent) return false;

    return true;
};
