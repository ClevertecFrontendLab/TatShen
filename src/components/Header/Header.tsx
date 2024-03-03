import React from 'react';
import { Layout } from 'antd';
import styles from './header.module.scss';
import Breadcrumbs from '@components/Bredcrumb/Bredcrumb';



const { Header } = Layout;


const Header_TS: React.FC = () => {
     
      return (
        <Header className={styles.header} style={{
            height: 'auto',
            background: ' #f0f5ff'
            }}>
            <Breadcrumbs></Breadcrumbs>
        </Header>
    );
};

export default Header_TS;
