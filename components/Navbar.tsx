import { UserButton, auth } from '@clerk/nextjs';
import MainNav from '@/components/MainNav';
import StoreSwitcher from '@/components/StoreSwitcher';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { ModeToggle } from './theme-toggole';

const Navbar = async () => {
    const { userId } = auth();
    console.log(userId);
    if (!userId) {
        redirect('/sign-in');
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    });
    return (
        <div className="boarder-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores} />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
};
export default Navbar;
