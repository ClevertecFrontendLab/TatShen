import Modal from '@components/Modal/Modal';
import React from 'react';
import styles from '../result-page.module.scss';
import { Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { REGISTRATION } from '@constants/router';
import {  useLocation, useNavigate } from 'react-router-dom';

const Error: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <Modal className={styles.container}>
            <div className={styles.content}>
                <CloseCircleFilled style={{ color: ' #ff4d4f' }} className={styles.icon} />
                <div className={styles.text_content} style={{ padding: '0px' }}>
                    <h2>Данные не сохранились</h2>
                    <span className={styles.error_user_exist}>
                        Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.
                    </span>
                </div>
                <Button style={{ width: '100%' }} onClick={()=> navigate(`/auth/${REGISTRATION}`, {state:{from : location.pathname}})} data-test-id='registration-retry-button'>
                    Повторить
                </Button>
            </div>
        </Modal>
    );
};

export default Error;
