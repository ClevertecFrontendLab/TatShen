import Modal from '@components/Modal/Modal';
import React from 'react';
import styles from './confirm-email.module.scss';
import { ExclamationCircleFilled } from '@ant-design/icons';
import VerificationInput from 'react-verification-input';

const Code: React.FC = () => {
    return (
        <Modal className={styles.code_container}>
            <div className={styles.content}>
                <ExclamationCircleFilled style={{ color: ' #2f54eb' }} className={styles.icon} />
                <div className={styles.text_content} style={{ padding: '0px' }}>
                    <h2>Введите код для восстановления аккауанта</h2>
                    <span className={styles.error_user_exist}>
                        Мы отправили вам на e-mail{' '}
                        <span style={{ fontWeight: '600' }}>victorbyden@gmail.com</span>{' '}
                        шестизначный код. Введите его в поле ниже.
                    </span>
                </div>
                <VerificationInput placeholder=''/>
                <span className={styles.letter}>Не пришло письмо? Проверьте папку Спам.</span>
            </div>
        </Modal>
    );
};

export default Code;