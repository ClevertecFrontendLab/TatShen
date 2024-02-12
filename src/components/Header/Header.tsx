import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Layout, Typography } from 'antd';
import styles from './header.module.scss';
import { SettingOutlined } from '@ant-design/icons/lib/icons';


const { Header } = Layout;
const { Title } = Typography;

const Header_TS: React.FC = () => {
    const [width, setWidth] = useState(1440)

    useEffect(()=>{
        setWidth(window.innerWidth)
    },[])
    console.log(width);
    


    return (
        <Header className={styles.header}>
            <Breadcrumb>
                <Breadcrumb.Item className={styles.breadcrumb}>Главная</Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.headerContent}>
                <Title className={styles.title}>Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </Title>
                <Button icon= { <SettingOutlined className={styles.buttonIcon}/>} className={styles.settings}>Настройки</Button>
            </div>
        </Header>
    );
};

export default Header_TS;
