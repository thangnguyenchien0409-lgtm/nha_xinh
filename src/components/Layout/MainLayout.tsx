import type { PropsWithChildren } from 'react';

function MainLayout({ children }: PropsWithChildren) {
    return <div className='mt-[50px] w-full px-4 lg:mx-auto lg:w-7xl'>{children}</div>;
}

export default MainLayout;
