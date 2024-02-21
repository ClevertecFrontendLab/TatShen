import Modal from '@components/Modal/Modal';
import React from 'react';
import styles from '../result-page.module.scss';
import { CloseCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import {  CHANGE_PASSWORD } from '@constants/router';
import {  useLocation, useNavigate } from 'react-router-dom';

const ErrorChangePassword: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/auth/ ${CHANGE_PASSWORD}`, {state:{from: location.pathname}})
    }
    return (
        <Modal className={styles.container}>
            <div className={styles.content}>
                <CloseCircleFilled style={{ color: ' #ff4d4f' }} className={styles.icon} />
                <div className={styles.text_content} style={{ padding: '0px' }}>
                    <h2>Данные не сохранились</h2>
                    <span className={styles.error_user_exist}>
                        Что-то пошло не так. попробуйте еще раз
                    </span>
                </div>
                <Button style={{ width: '100%' }} onClick={handleClick} data-test-id='change-retry-button'>Повторить</Button>
            </div>
        </Modal>
    );
};

export default ErrorChangePassword;
