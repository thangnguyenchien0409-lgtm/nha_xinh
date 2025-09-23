import { createContext, useState, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerLivingRoom from '@/assets/img/banner-room-1.jpg';

type ActiveContextType = {
    isActiveNav: string | null;
    setIsActiveNav: React.Dispatch<React.SetStateAction<string | null>>;
    handleNavigateHome: () => void;
    room: any | null;
    setRoom: React.Dispatch<React.SetStateAction<any | null>>;
    currentSubCate: any | null;
    setCurrentSubCate: React.Dispatch<React.SetStateAction<any | null>>;
};

export const ActiveContext = createContext<ActiveContextType | undefined>(undefined);
export function ActiveProvider({ children }: PropsWithChildren) {
    const [isActiveNav, setIsActiveNav] = useState<string | null>(null);
    const [room, setRoom] = useState<any | null>({
        type: 'livingRoom',
        src: BannerLivingRoom,
        name: 'Phòng khách'
    });

    const [currentSubCate, setCurrentSubCate] = useState<any | null>(null);

    const navigate = useNavigate();

    const handleNavigateHome = () => {
        setIsActiveNav(null);
        navigate('/');
    };

    const value: ActiveContextType = {
        isActiveNav,
        setIsActiveNav,
        handleNavigateHome,
        room,
        setRoom,
        currentSubCate,
        setCurrentSubCate
    };
    return <ActiveContext.Provider value={value}>{children}</ActiveContext.Provider>;
}
