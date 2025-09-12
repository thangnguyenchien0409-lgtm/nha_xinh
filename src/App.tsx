import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Suspense } from 'react';
import UserPage from '@/pages/UserPage/UserPage';
import AdminPage from '@/pages/AdminPage/AdminPage';
import { ActiveProvider } from '@/context/ActiveContext';
import { ModalProvider } from '@/context/ModalContext';
import Auth from '@/components/Auth/Auth';

function App() {
    return (
        <>
            <ModalProvider>
                <Router>
                    <ActiveProvider>
                        <Suspense fallback={'loading'}>
                            <Routes>
                                <Route path='/*' element={<UserPage />} />
                                <Route path='/admin/*' element={<AdminPage />} />
                            </Routes>
                            <Auth />
                        </Suspense>
                    </ActiveProvider>
                </Router>
            </ModalProvider>
        </>
    );
}

export default App;
