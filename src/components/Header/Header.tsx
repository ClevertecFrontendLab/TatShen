import React from 'react';
import { Breadcrumb, Button, Layout, Typography } from 'antd';
import styles from './header.module.scss';
import { SettingOutlined } from '@ant-design/icons/lib/icons';
import { useResize } from '@hooks/useResize';


const { Header } = Layout;
const { Title } = Typography;

const Header_TS: React.FC = () => {
    const {width} = useResize()
      return (
        <Header className={styles.header} style={{
            height: 'auto',
            background: ' #f0f5ff'
            }}>
            <Breadcrumb style={{background:'transparent'}}>
                <Breadcrumb.Item className={styles.breadcrumb}>Главная</Breadcrumb.Item>
            </Breadcrumb>
        </Header>
    );
};

export default Header_TS;
