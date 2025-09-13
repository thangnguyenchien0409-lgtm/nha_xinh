import type { DataFooterType } from '@/components/Footer/data';

type FooterItemType = {
    title: string;
    data: DataFooterType[];
};

function FooterItem({ title, data }: FooterItemType) {
    return (
        <div className='w-full text-[#f1f1f1]'>
            <h3 className='mb-4 text-base font-semibold uppercase'>{title}</h3>

            <ul className='space-y-2 text-sm font-normal'>
                {data.map((item, index) => (
                    <li key={index}>
                        <a className='block transition-colors duration-200 hover:text-white'>
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FooterItem;
