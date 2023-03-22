import React from 'react';
import { SpinLoading } from 'antd-mobile';
export default () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <SpinLoading color="primary" style={{ '--size': '48px' }} />
    </div>
  );
};
