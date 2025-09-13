type BannerCategoryItemType = {
    url: string;
    text: string;
};

function BannerCategoryItem({ url, text }: BannerCategoryItemType) {
    return (
        <div
            style={{ backgroundImage: `url(${url})` }}
            className='flex h-full w-full items-center justify-center bg-cover bg-center bg-no-repeat'
        >
            <p className='text-xl font-semibold tracking-widest text-white uppercase'>{text}</p>
        </div>
    );
}

export default BannerCategoryItem;
