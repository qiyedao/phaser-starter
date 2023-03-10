import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loading from '../Loading';
const BasicLayout = lazy(() => import('../layout/BasicLayout'));
const Index = lazy(() => import('../pages/Index'));
const Home = lazy(() => import('../pages/Home'));
export default () => {
    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="" element={<BasicLayout />}>
                        <Route path="/" element={<Index />}></Route>
                        <Route path="/home" element={<Home />}></Route>
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
};
