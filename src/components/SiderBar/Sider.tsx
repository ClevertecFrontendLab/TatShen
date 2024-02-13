import React, { useState } from 'react';
import styles from './sider.module.scss';
import { HeartFilled, TrophyFilled, IdcardOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import cleverfit from '../../../public/cleverFit.svg';
import fit from '../../../public/fit.svg'
import exit from '../../../public/exit.svg';
import calendar from '../../../public/calendar.svg'
const { Sider } = Layout;
import { useResize } from '@hooks/useResize';

const SiderBar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
     const {width} = useResize()
    
    const handlerCollapsed = () => {
        setCollapsed(!collapsed)
    }
    return (
        <Sider className={styles.sider}  trigger={null} collapsible collapsed={collapsed} width={width<600? 106 : 208} collapsedWidth={width<600 ? 1 : 64}>
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
                <Button className={ styles.button_open} style={{height:'40px', boxShadow: ' inset 0 1px 0 0  rgba(0, 0, 0, 0.15)'}}>
                    <img src={exit} alt='exit' className={styles.exit}/>
                    { collapsed ? '' : <span>Выход</span>}
                </Button>
            </div>
            {width <700 ?  <button className={styles.siderButtonMobile} onClick={handlerCollapsed} data-test-id='sider-switch-mobile'>
                {collapsed ? <MenuUnfoldOutlined className={styles.siderButtonIcon}/> : <MenuFoldOutlined className={styles.siderButtonIcon} /> 
                }
            </button> :
            <button className={styles.siderButton} onClick={handlerCollapsed} data-test-id='sider-switch'>
                {collapsed ? <MenuUnfoldOutlined className={styles.siderButtonIcon}/> : <MenuFoldOutlined className={styles.siderButtonIcon} /> 
                }
            </button>}
        </Sider>
    );
};

export default SiderBar;
