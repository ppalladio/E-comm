import { UserButton } from '@clerk/nextjs';
import MainNav from '@/components/MainNav';

const Navbar = () => {
    return (
        <div className="boarder-b">
            <div className="flex h-16 items-center px-4">
                <div>store switcher // </div>
                <MainNav className='mx-6'/>
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl='/' />
                NM</div>
            </div>
        </div>
    );
};
export default Navbar;
