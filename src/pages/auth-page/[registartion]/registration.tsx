import React from "react";
import styles from '../auth-page.module.scss'
import Modal from "@components/Modal/Modal";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { AUTH } from "@constants/router";
import SingUp from "@components/SingUp/SingUp";


const Registration:React.FC = () => {
    const navigate = useNavigate()
    return <Modal className={styles.enter_modal}>
                <div className={styles.modal_content}>
                <div className={styles.button_container}>
                    <button className={styles.button} onClick={()=>navigate(AUTH)}> <span>Вход</span> </button>
                    <button className={ classNames(styles.button, styles.auth_user)  } > <span>Регистрация</span></button>
                </div>
                 <SingUp></SingUp> 
                </div>      
            </Modal>
}


export default Registration