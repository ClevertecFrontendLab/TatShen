import Modal from '@components/Modal/Modal';
import React from 'react';
import styles from '../result-page.module.scss';
import { CloseCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { AUTH } from '@constants/router';
import { Link } from 'react-router-dom';

const ErrorEmailNoExist: React.FC = () => {
    return (
        <Modal className={styles.container}>
            <div className={styles.content}>
                <CloseCircleFilled style={{ color: ' #ff4d4f' }} className={styles.icon} />
                <div className={styles.text_content} style={{ padding: '0px' }}>
                    <h2>Такой e-mail не зарегистрирован</h2>
                    <span className={styles.error_user_exist}>
                        Мы не нашли в базе вашего e-mail. Попробуйте <br/>войти с другим e-mail.
                    </span>
                </div>
                <Button style={{ width: '100%' }}><Link to={AUTH}>Попробовать снова</Link></Button>
            </div>
        </Modal>
    );
};

export default ErrorEmailNoExist;
