import Modal from "@components/Modal/Modal";
import React from "react";
import styles from '../result-page.module.scss'
import { WarningFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { AUTH } from "@constants/router";

const ErrorLogin:React.FC = () => {
    const navigate = useNavigate()
    return <Modal className={styles.container}>
        <div className={styles.content}>
            <WarningFilled style={{color:'#faad14'}} className={styles.icon}/>
            <div className={styles.text_content} style={{padding:'0px'}}>
                <h2>Вход не выполнен</h2>
                <span >Что-то пошло не так. Попробуйте еще раз</span>
            </div>
            <Button style={{width:'100%'}} onClick={()=>navigate(AUTH)}>Повторить</Button>
        </div>
       
    </Modal>
}

export default ErrorLogin