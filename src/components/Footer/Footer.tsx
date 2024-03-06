import { Footer } from "antd/lib/layout/layout";
import DownloadCard from "@components/DownloadCard/DownloadCard";
import {  useNavigate } from "react-router-dom";


import { FEEDBACKS } from "@constants/router";

import styles from './footer.module.scss'


const Footer_TS:React.FC = () => {
    const navigate = useNavigate()
  
    return <Footer className={styles.footer} style={{background: 'transparent'}} >
        <button className={styles.link} onClick={() => navigate(FEEDBACKS)} data-test-id='see-reviews' >Смотреть отзывы</button>
        <DownloadCard></DownloadCard>
    </Footer>
}

export default Footer_TS

