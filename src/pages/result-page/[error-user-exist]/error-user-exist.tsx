import Modal from "@components/Modal/Modal";
import React from "react";
import styles from '../result-page.module.scss'
import { CloseCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { AUTH } from "@constants/router";

const ErrorUserExistWithEmail:React.FC = () => {
    return <Modal className={styles.container}>
        <div className={styles.content}>
            <CloseCircleFilled style={{color:' #ff4d4f'}} className={styles.icon}/>
            <div className={styles.text_content} style={{padding:'0px'}}>
                <h2>Данные не сохранились</h2>
                <span className={styles.error_user_exist} >Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.</span>
            </div>
            <Button  style={{width:'100%'}}> <Link to={AUTH}>Назад к регистрации</Link></Button>
        </div>
       
    </Modal>
}

export default ErrorUserExistWithEmail