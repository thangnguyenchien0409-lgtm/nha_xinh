import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Suspense } from 'react';
import UserPage from '@/pages/UserPage/UserPage';
import AdminPage from '@/pages/AdminPage/AdminPage';
import { ActiveProvider } from '@/context/ActiveContext';
import { ModalProvider } from '@/context/ModalContext';
import Auth from '@/components/Auth/Auth';
import { ToastProvider } from '@/context/ToastContext';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import Loading from '@/components/Loading/Loading';

function App() {
    return (
        <ToastProvider>
            <ModalProvider>
                <Router>
                    <ScrollToTop />
                    <ActiveProvider>
                        <Suspense fallback={<Loading />}>
                            <Routes>
                                <Route path='/*' element={<UserPage />} />
                                <Route path='/admin/*' element={<AdminPage />} />
                            </Routes>
                            <Auth />
                        </Suspense>
                    </ActiveProvider>
                </Router>
            </ModalProvider>
        </ToastProvider>
    );
}

export default App;
