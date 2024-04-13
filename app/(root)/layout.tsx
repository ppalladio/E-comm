import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function SetupLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    const { userId } = auth();
    if (!userId) {
        redirect('/sign-in');
    }
    console.log(process.env.DATABASE_URL);
    const store = await prismadb.store.findFirst({
        where: {
            userId,
        },
    });

    if (store) {
        redirect(`${store.id}`);
    }

    return <>{children}</>;
}
