import Modal from '@components/Modal/Modal';
import React from 'react';
import styles from '../result-page.module.scss';
import { CheckCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { AUTH } from '@constants/router';

const SuccessChangePassword: React.FC = () => {
    return (
        <Modal className={styles.container}>
            <div className={styles.content}>
                <CheckCircleFilled style={{ color: '#52c41a' }} className={styles.icon} />
                <div className={styles.text_content}>
                    <h2>Пароль успешно изменен</h2>
                    <span>Теперь можно войти в аккаунт, используя свой логин и новый пароль</span>
                </div>
                <Button style={{ width: '100%' }} data-test-id='change-entry-button'><Link to={AUTH}> Вход</Link></Button>
            </div>
        </Modal>
    );
};

export default SuccessChangePassword;