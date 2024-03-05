import React from "react";
import Modal from "@components/Modal/Modal";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { REGISTRATION } from "@constants/router";
import cleverFit from '../../../assets/cleverFit.svg'
import SingIn from "@components/SingIn/SingIn";
import styles from '../auth-page.module.scss'

const Auth:React.FC = () => {
    const navigate = useNavigate()
    return <Modal className={styles.enter_modal}>
                <img src={cleverFit} alt="cleverFit" className={styles.logo} ></img> 
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