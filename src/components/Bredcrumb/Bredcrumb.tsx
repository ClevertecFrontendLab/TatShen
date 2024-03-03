import { Breadcrumb } from "antd";
import React from "react";

import styles from './Bredcrumb.module.scss'
import { Link, useLocation } from "react-router-dom";

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
    {pathname === '/main' ? <Link to ={pathname}className ={styles.breadcrumb}> Главная</Link> : <span><Link to ='/main'className ={styles.breadcrumb}> Главная</Link> / <Link  to={pathname} className={styles.breadcrumb}>{vocabulary[pathname]}</Link></span>}

</Breadcrumb>
}

export default Breadcrumbs