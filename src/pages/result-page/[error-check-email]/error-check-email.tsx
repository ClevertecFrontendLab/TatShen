import Modal from "@components/Modal/Modal";
import React from "react";
import styles from '../result-page.module.scss'
import error from '../../../assets/error.svg'
import { Button } from "antd";
import {  useLocation, useNavigate } from "react-router-dom";
import { AUTH } from "@constants/router";

const ErrorCheckEmail:React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    return <Modal className={styles.error_container}>
        <div className={styles.content}>
            <img src={error} alt="error"></img>
            <div className={styles.text_content} style={{padding:'0px'}}>
                <h2>Что-то пошло не так</h2>
                <span className={styles.error_user_exist} >Произошла ошибка, попробуйте отправить форму ещё раз.</span>
            </div>
            <Button  style={{width:'74px', height:'40px', padding:'4px 15px'}} onClick={() => navigate(AUTH, {state:{from:location}})}data-test-id='check-back-button'> Назад</Button>
        </div>
       
    </Modal>
}

export default ErrorCheckEmail