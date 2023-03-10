import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const BasicLayout = await import('../layout/BasicLayout');
const Index = await import('../pages/Index');
const Home = await import('../pages/Home');

export default () => {
    return (
        <Router>
            <Routes>
                <Route element={<BasicLayout.default />}>
                    <Route path="/" element={<Index.default />}></Route>
                    <Route path="/home" element={<Home.default />}></Route>
                </Route>
            </Routes>
        </Router>
    );
};
