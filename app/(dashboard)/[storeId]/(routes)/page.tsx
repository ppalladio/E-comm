import prismadb from '@/lib/prismadb';

interface StoreDashboardPageProps {
    params: { storeId: string };
}

const DashboardPage: React.FC<StoreDashboardPageProps> = async ({ params }) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        },
    });

    return (
        <div>
            currently on store
            <span className="text-blue-500">{store?.name}</span>
        </div>
    );
};
export default DashboardPage;
