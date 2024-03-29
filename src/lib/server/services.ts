import { error } from '@sveltejs/kit';
import prisma from '@db';

export async function getPaste(key: string) {
    let data = await prisma.paste.findUnique({
        where: { key },
        select: {
            content: true,
            encrypted: true,
            passwordProtected: true,
            initVector: true,
            language: true,
            expiresCount: true,
            readCount: true,
            ownerId: true,
        },
    });

    if (!data) error(404, 'Not found');

    data = await prisma.paste.update({
        where: { key },
        data: { readCount: { increment: 1 } },
    });

    const { expiresCount, readCount } = data;
    if (expiresCount !== null && expiresCount < readCount) {
        await prisma.paste.delete({ where: { key } });
        error(404, 'Not found');
    }

    const {
        content,
        encrypted,
        passwordProtected,
        initVector,
        language,
        ownerId,
    } = data;

    return {
        key,
        content,
        encrypted,
        passwordProtected,
        initVector,
        language,
        ownerId,
    };
}

export async function deleteExpiredPastes() {
    await prisma.paste.deleteMany({
        where: {
            expiresAt: {
                lt: new Date(),
            },
        },
    });
}
