import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name } = body;
        if (!name) {
            return new NextResponse('Missing name', { status: 400 });
        }
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId,
            },
        });
        return NextResponse.json(store);
    } catch (e) {
        console.log('[/app/api/store/post]', e);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
