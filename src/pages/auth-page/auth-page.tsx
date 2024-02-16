import React, { useState } from "react";
import background from '../../assets/enter_page_light.jpg'
import { Layout } from "antd";
import Modal from "@components/Modal/Modal";
import styles from './auth-page.module.scss'
import SingUp from "@components/SingUp/SingUp";
import classNames from "classnames";
import SingIn from "@components/SingIn/SingIn";

const AuthPage:React.FC = () => {
    const[isAuthUser, setIsAuthUser]= useState(false)
    

    return (<Layout style={{background:`url(${background})`, backgroundSize:'cover' ,backgroundPosition: 'center', minHeight:'100vh', height:'100%', maxWidth:'1440px'}}>
            <Modal className={styles.enter_modal}>
                {<div className={styles.modal_content}>
                <div className={styles.button_container}>
                    <button className={isAuthUser? classNames(styles.button, styles.auth_user) : styles.button} onClick={()=>setIsAuthUser(!isAuthUser)}> <span>Вход</span> </button>
                    <button className={isAuthUser? styles.button :classNames(styles.button, styles.auth_user) } onClick={()=>setIsAuthUser(!isAuthUser)}> <span>Регистрация</span></button>
                </div>
                    {isAuthUser?  <SingIn></SingIn> :<SingUp></SingUp>}
                </div>}      
            </Modal>
    </Layout>)
}

export default AuthPage