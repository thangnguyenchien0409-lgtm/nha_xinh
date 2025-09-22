import { FaStar } from 'react-icons/fa';
import { FaStarHalf, FaRegStar } from 'react-icons/fa';
import Avatar from '@/assets/img/avatar-icon.png';
import { useState } from 'react';

type Star = 1 | 2 | 3 | 4 | 5;

function Review({ data }: { data: any }) {
    const [limitReview, setLimitReview] = useState(3);

    const renderStars = (rating: number, size: number = 24) => {
        return [...Array(5)].map((_, i) => {
            const starValue = i + 1;
            if (rating >= starValue)
                return <FaStar key={i} size={size} className='text-yellow-400' />;
            if (rating >= starValue - 0.5)
                return <FaStarHalf key={i} size={size} className='text-yellow-400' />;
            return <FaRegStar key={i} size={size} className='text-yellow-400' />;
        });
    };

    const getRatingStar = (reviews: { ratings: Star }[]) => {
        return reviews.reduce<Record<Star, number>>(
            (acc, r) => {
                acc[r.ratings] = (acc[r.ratings] || 0) + 1;
                return acc;
            },
            { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        );
    };

    const starCount = getRatingStar(data.reviews);

    const getPercentWidth = (s: Star) => {
        return (starCount[s] / data.ratingsQuantity) * 100;
    };

    const handleClickLimitReview = () => {
        setLimitReview((prev) => prev + 3);
        window.scrollBy({
            top: -500,
            behavior: 'smooth'
        });
    };

    return (
        <div className='mt-5'>
            <div className='flex gap-10'>
                <div className='flex w-[40%] flex-col items-center justify-center gap-2 border-r-3 border-solid border-[#e1e1e1]'>
                    <div>
                        <p className='text-[50px] font-bold'>{data.ratingsAverage}</p>
                        <div className='flex gap-2'>{renderStars(data.ratingsAverage)}</div>
                    </div>
                    <p className='text-[18px] text-[#aaa]'>({data.ratingsQuantity} Review)</p>
                </div>

                <div className='flex flex-1 flex-col gap-5'>
                    {[5, 4, 3, 2, 1].map((s, index) => (
                        <div className='flex items-center gap-4' key={index}>
                            <div className='flex items-center gap-2'>
                                {s} <FaStar className='text-yellow-400' />
                            </div>
                            <div className='h-[4px] w-[80%] overflow-hidden rounded-full bg-[#ebebeb]'>
                                <div
                                    style={{ width: `${getPercentWidth(s as Star)}%` }}
                                    className={`h-full bg-yellow-400`}
                                ></div>
                            </div>
                            <p className='text-sm font-medium text-[#aaa]'>
                                {starCount[s as Star]}
                                <span> review</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {data.reviews.slice(-limitReview).map((item: any) => (
                <div key={item._id} className='mx-auto mt-20 w-[90%]'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <div className='w-[30px]'>
                                <img className='h-full w-full object-cover' src={Avatar} alt='' />
                            </div>
                            <p className='font-semibold'>{item.userId.name}</p>
                        </div>

                        <p className='text-sm font-medium text-[#aaa]'>
                            {new Date(data.updatedAt).toLocaleDateString()}
                        </p>
                    </div>

                    <div className='text-text-title mt-3 w-[50%] text-sm'>{item.title}</div>
                    <div className='mt-3 flex gap-2'>{renderStars(item.ratings, 18)}</div>
                </div>
            ))}
            {limitReview < data.reviews.length && (
                <div
                    onClick={handleClickLimitReview}
                    className='mx-auto mt-20 w-[90%] cursor-pointer font-semibold underline'
                >
                    Xem thêm đánh giá
                </div>
            )}
        </div>
    );
}

export default Review;
