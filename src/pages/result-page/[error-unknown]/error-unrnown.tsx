import Modal from '@components/Modal/Modal';
import React from 'react';
import styles from '../result-page.module.scss';
import error from '../../../assets/error.svg'
import { Button } from 'antd';

const ErrorUnknown: React.FC = () => {
    return (
        <Modal className={styles.error_container}>
            <div className={styles.content}>
                <img src={error} alt='error'></img>
                <div className={styles.text_content} style={{ padding: '0px' }}>
                    <h2>Что-то пошло не так</h2>
                    <span className={styles.error_user_exist}>
                    Произошла ошибка, попробуйте отправить форму ещё раз.
                    </span>
                </div>
                <Button style={{width:'74px'}}>Назад</Button>
            </div>
        </Modal>
    );
};

export default ErrorUnknown;
