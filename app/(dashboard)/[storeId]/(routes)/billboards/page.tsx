import prismadb from '@/lib/prismadb';
import BillBoardClient from './components/client';

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
    const billboards = await prismadb.billboard.findMany({
        where: { storeId: params.storeId },
        orderBy: { createdAt: 'desc' },
    });
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillBoardClient data={billboards} />
            </div>
        </div>
    );
};
export default BillboardsPage;