import SideBarAdmin from '@/components/SideBar/SideBarAdmin';
import routerAdmin from '@/router/routerAdmin';
import { Routes, Route } from 'react-router-dom';

function AdminPage() {
    return (
        <div className=''>
            <SideBarAdmin />
            <div className='ml-[250px] py-[30px]'>
                <Routes>
                    {routerAdmin.map((route) => (
                        <Route key={route.path} path={route.path} element={<route.element />} />
                    ))}
                </Routes>
            </div>
        </div>
    );
}

export default AdminPage;
