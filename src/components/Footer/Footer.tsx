import React from "react";
import styles from './footer.module.scss'
import { Footer } from "antd/lib/layout/layout";
import DownloadCard from "@components/DownloadCard/DownloadCard";
import { Link } from "react-router-dom";

const Footer_TS:React.FC = () => {
    return <Footer className={styles.footer} style={{background: 'transparent'}} >
        <Link to={'/'} className={styles.link}>Смотреть отзывы</Link>
        <DownloadCard></DownloadCard>
    </Footer>
}

export default Footer_TS