import React, { useState } from 'react';
import styles from './sider.module.scss';
import { HeartFilled, TrophyFilled, IdcardOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import cleverfit from '../../../public/cleverFit.svg';
import fit from '../../../public/fit.svg'
import exit from '../../../public/exit.svg';
import calendar from '../../../public/calendar.svg'
const { Sider } = Layout;

const SiderBar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handlerCollapsed = () => {
        console.log('click');
        
        setCollapsed(!collapsed)
    }
    return (
        <Sider className={styles.sider}  trigger={null} collapsible collapsed={collapsed} width={208} collapsedWidth={64}>
            <div className={collapsed ? styles.siderContent_close :styles.siderContent_open}>
                <div className={ collapsed ? styles.logo_fit : styles.logo}>
                    <img src={collapsed ? fit : cleverfit} alt='cleverFit' />
                </div>
                <Menu
                    className={ collapsed ? styles.menu_close : styles.menu_open}
                    items={[
                        {
                            key: '1',
                            icon:<img src={calendar} alt='calendar' className={styles.sider_Icon}/>
                            ,
                            label:  collapsed ? '' : 'Календарь',
                        },
                        {
                            key: '2',
                            icon: <HeartFilled className={styles.sider_Icon} />,
                            label: collapsed ? '' : 'Тренировки',
                        },
                        {
                            key: '3',
                            icon: <TrophyFilled className={styles.sider_Icon} />,
                            label:  collapsed ? '' : 'Достижения',
                        },
                        {
                            key: '4',
                            icon: <IdcardOutlined className={styles.sider_Icon} />,
                            label:  collapsed ? '' : 'Профиль',
                        },
                    ]}
                ></Menu>
                <Button className={ styles.button_open}>
                    <img src={exit} alt='exit' />
                    { collapsed ? '' : <span>Выход</span>}
                </Button>
            </div>
            <button className={styles.siderButton} onClick={handlerCollapsed}>
                <svg width="20" height="66" viewBox="0 0 20 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 -1.52588e-05L20 7.99998V58L0 66V-1.52588e-05Z" fill="white" />
                </svg>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: styles.siderButtonIcon,
                })}
                
            </button>
        </Sider>
    );
};

export default SiderBar;
