import { createContext, useState, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

type ActiveContextType = {
    isActiveNav: string | null;
    setIsActiveNav: React.Dispatch<React.SetStateAction<string | null>>;
    handleNavigateHome: () => void;
};

export const ActiveContext = createContext<ActiveContextType | undefined>(undefined);
export function ActiveProvider({ children }: PropsWithChildren) {
    const [isActiveNav, setIsActiveNav] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleNavigateHome = () => {
        setIsActiveNav(null);
        navigate('/');
    };

    const value: ActiveContextType = {
        isActiveNav,
        setIsActiveNav,
        handleNavigateHome
    };
    return <ActiveContext.Provider value={value}>{children}</ActiveContext.Provider>;
}
