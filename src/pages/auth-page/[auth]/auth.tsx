import React from "react";
import styles from '../auth-page.module.scss'
import Modal from "@components/Modal/Modal";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { REGISTRATION } from "@constants/router";
import SingIn from "@components/SingIn/SingIn";

const Auth:React.FC = () => {
    const navigate = useNavigate()
    return <Modal className={styles.enter_modal}>
                <div className={styles.modal_content}>
                <div className={styles.button_container}>
                    <button className={classNames(styles.button, styles.auth_user)} > <span>Вход</span> </button>
                    <button className={ styles.button  } onClick={()=>navigate(REGISTRATION)}> <span>Регистрация</span></button>
                </div>
                 <SingIn></SingIn> 
                </div>      
            </Modal>
}


export default Auth