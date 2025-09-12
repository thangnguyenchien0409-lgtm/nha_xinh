import { createContext, useEffect, useState, type PropsWithChildren } from 'react';

type ModalContextType = {
    isOpenAuth: boolean;
    isOpenSideBar: boolean;
    isOpenModalProduct: boolean;
    typeActionProduct: string | null;
    setIsOpenAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setTypeActionProduct: React.Dispatch<React.SetStateAction<string>>;
    setIsOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenModalProduct: React.Dispatch<React.SetStateAction<boolean>>;
    handleToggleAuthForm: () => void;
    handleToggleSideBar: () => void;
    handleToggleModalProduct: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: PropsWithChildren) {
    const [typeActionProduct, setTypeActionProduct] = useState('');
    const [isOpenAuth, setIsOpenAuth] = useState(false);
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    const [isOpenModalProduct, setIsOpenModalProduct] = useState(false);

    const handleToggleAuthForm = () => setIsOpenAuth(!isOpenAuth);
    const handleToggleSideBar = () => setIsOpenSideBar(!isOpenSideBar);
    const handleToggleModalProduct = () => setIsOpenModalProduct(!isOpenModalProduct);

    useEffect(() => {
        if (isOpenAuth || isOpenSideBar || isOpenModalProduct) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpenAuth, isOpenSideBar, isOpenModalProduct]);

    const value: ModalContextType = {
        isOpenAuth,
        setIsOpenAuth,
        handleToggleAuthForm,
        isOpenSideBar,
        setIsOpenSideBar,
        handleToggleSideBar,
        isOpenModalProduct,
        setIsOpenModalProduct,
        handleToggleModalProduct,
        typeActionProduct,
        setTypeActionProduct
    };

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
