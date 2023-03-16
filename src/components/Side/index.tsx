import { Button } from 'antd-mobile';
import classNames from 'classnames';
import React from 'react';
import styles from './index.module.less';
interface ISideProps {
    width: number;
}
const Side: React.FC<ISideProps> = ({ width }) => {
    return (
        <div className={classNames(styles.side, ' bg-red-400')} style={{ width }}>
            大屏侧边栏
            <Button color="primary">click</Button>
        </div>
    );
};
export default Side;
