import { ClipLoader } from 'react-spinners';

function Loading() {
    return (
        <div className='flex h-full w-full items-center justify-center'>
            <ClipLoader size={40} color='#86E7D4' />
        </div>
    );
}

export default Loading;
