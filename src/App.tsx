import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Suspense } from 'react';
import UserPage from '@/pages/UserPage/UserPage';
import AdminPage from '@/pages/AdminPage/AdminPage';

function App() {
    return (
        <>
            <Router>
                <Suspense fallback={'loading'}>
                    <Routes>
                        <Route path='/*' element={<UserPage />} />
                        <Route path='/admin/*' element={<AdminPage />} />
                    </Routes>
                </Suspense>
            </Router>
        </>
    );
}

export default App;
