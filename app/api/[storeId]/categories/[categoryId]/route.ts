import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params }: { params: { categoryId: string } },
) {
    try {
        if (!params.categoryId) {
            return new NextResponse('category ID is required', {
                status: 400,
            });
        }
        const category = await prismadb.category.findUnique({
            where: { id: params.categoryId },
            include: {
                billboard: true,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log(
            'app/api/storeid/categories/[categoryId]/route, GET',
            error,
        );
        return new NextResponse('Internal Error', { status: 500 });
    }
}
export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string; categoryId: string } },
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name, billboardId } = body;
        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 });
        }
        if (!name) {
            return new NextResponse('Name is required', { status: 400 });
        }
        if (!billboardId) {
            return new NextResponse('Billboard ID is required', {
                status: 400,
            });
        }

        if (!params.categoryId) {
            return new NextResponse('category Id is required', {
                status: 400,
            });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: { id: params.storeId, userId },
        });

        if (!storeByUserId) {
            return new NextResponse(
                'Stop doing what you are doing, you are not authorized',
                { status: 403 },
            );
        }

        const category = await prismadb.category.update({
            where: { id: params.categoryId },
            data: {
                name,
                billboardId,
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        console.log(
            'app/api/storeId/categories/[categoryId]/route, PATCH',
            error,
        );
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string; categoryId: string } },
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 });
        }

        if (!params.categoryId) {
            return new NextResponse('category ID is required', {
                status: 400,
            });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: { id: params.storeId, userId },
        });

        if (!storeByUserId) {
            return new NextResponse(
                'Stop doing what you are doing, you are not authorized',
                { status: 403 },
            );
        }
        const category = await prismadb.category.deleteMany({
            where: { id: params.categoryId },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log(
            'app/api/storeid/categories/[categoryId]/route, DELETE',
            error,
        );
        return new NextResponse('Internal Error', { status: 500 });
    }
}
