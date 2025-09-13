import Banner from '@assets/img/trinh-chieu-TV-3.gif';

function BannerSecond() {
    return (
        <div
            className={`ld:h-[500px] flex h-[400px] w-full flex-col items-center justify-between bg-cover bg-center bg-no-repeat py-6 text-white lg:h-screen`}
            style={{ backgroundImage: `url(${Banner})` }}
        ></div>
    );
}

export default BannerSecond;
