import { Button } from 'antd-mobile';
import classNames from 'classnames';
import React from 'react';
import styles from './index.module.less';
import styled from 'styled-components';
interface ISideProps {
    width: number;
}
const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
`;
const Side: React.FC<ISideProps> = ({ width }) => {
    return (
        <div className={classNames(styles.side, ' bg-red-400')} style={{ width }}>
            <Wrapper>
                大屏侧边栏
                <Button color="primary">click</Button>
            </Wrapper>
        </div>
    );
};
export default Side;
