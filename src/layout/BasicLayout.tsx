import React from 'react';
import { Link, Outlet } from 'react-router-dom';
export default () => {
    return (
        <div>
            <div style={{ marginBottom: 100 }}>
                <Link to="/" style={{ marginRight: 50 }}>
                    index
                </Link>

                <Link to="/home">home</Link>
            </div>
            <Outlet />
        </div>
    );
};
