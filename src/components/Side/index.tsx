import { Button } from 'antd-mobile';
import classNames from 'classnames';
import React from 'react';
import styles from './index.module.less';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import stores from '../../stores';

interface ISideProps {
    width: number;
}
const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
`;
const Side: React.FC<ISideProps> = observer(({ width }) => {
    return (
        <div className={classNames(styles.side, ' bg-red-400')} style={{ width }}>
            <Wrapper>
                大屏侧边栏
                <Button
                    onClick={() => {
                        const data = stores.global.setTime(new Date().getTime());
                        const fetchData = stores.global.fetchValue(new Date().getTime());
                        console.log(data, fetchData);
                    }}
                    color="primary"
                >
                    click {stores.global.time}
                </Button>
            </Wrapper>
        </div>
    );
});
export default Side;
