import { Routes, Route } from 'react-router-dom';

import Header from '@/components/Header/Header';
import routerUser from '@/router/routerUser';

function UserPage() {
    return (
        <div className='w-full overflow-hidden'>
            <Header />
            <Routes>
                {routerUser.map((route) => (
                    <Route key={route.path} path={route.path} element={<route.element />} />
                ))}
            </Routes>
        </div>
    );
}

export default UserPage;
