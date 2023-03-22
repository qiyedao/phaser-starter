import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loading from '../Loading';
const BasicLayout = lazy(() => import('../layout/BasicLayout'));
const Home = lazy(() => import('../pages/Home'));
const Poster = lazy(() => import('../pages/Poster/index'));
export default () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="" element={<BasicLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/poster" element={<Poster />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};
