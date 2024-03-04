import { Breadcrumb } from "antd";
import React from "react";

import styles from './Bredcrumb.module.scss'
import { useLocation } from "react-router-dom";

type Vocabulary = {
      [key: string]: string
  }
  
  const vocabulary: Vocabulary = {
    '/main': "Главная",
    '/feedbacks': "Oтзывы пользователей",
  }

const Breadcrumbs:React.FC = () => {
    const pathname = useLocation().pathname
    
return <Breadcrumb style={{background:'transparent'}}>
    {pathname === '/main' ? <Breadcrumb.Item  href ={pathname}className ={styles.breadcrumb}> Главная</Breadcrumb.Item> : <><Breadcrumb.Item href='/main' className={styles.breadcrumb}> Главная</Breadcrumb.Item><Breadcrumb.Item href={pathname} className={styles.breadcrumb}>{vocabulary[pathname]}</Breadcrumb.Item></>}

</Breadcrumb>
}

export default Breadcrumbs