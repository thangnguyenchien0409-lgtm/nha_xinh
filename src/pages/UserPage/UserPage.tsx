import { Routes, Route } from 'react-router-dom';

import Header from '@/components/Header/Header';
import routerUser from '@/router/routerUser';
import ModalActionProduct from '@/components/ModalActionProduct/ModalActionProduct';

function UserPage() {
    return (
        <div className='w-full overflow-hidden'>
            <Header />
            <Routes>
                {routerUser.map((route) => (
                    <Route key={route.path} path={route.path} element={<route.element />} />
                ))}
            </Routes>
            <ModalActionProduct />
        </div>
    );
}

export default UserPage;
