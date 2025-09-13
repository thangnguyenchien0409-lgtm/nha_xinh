import { createContext, type PropsWithChildren } from 'react';
import { ToastContainer, toast } from 'react-toastify';

type ToastContextType = {
    toast: typeof toast;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: PropsWithChildren) => {
    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
};
