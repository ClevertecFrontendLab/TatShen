import Modal from '@components/Modal/Modal';
import React from 'react';
import styles from '../result-page.module.scss';
import { CheckCircleFilled} from '@ant-design/icons';
import { Button } from 'antd';
import { AUTH } from '@constants/router';
import { Link } from 'react-router-dom';

const Success: React.FC = () => {
    return (
        <Modal className={styles.container}>
            <div className={styles.content}>
                <CheckCircleFilled style={{ color: '#52c41a' }} className={styles.icon} />
                <div className={styles.text_content}>
                    <h2>Регистрация успешна</h2>
                    <span>
                        Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и
                        пароль.
                    </span>
                </div>
                <Button  style={{ width: '100%' }} data-test-id='registration-enter-button'>
                    <Link to={AUTH}> Вoйти</Link>
                </Button>
            </div>
        </Modal>
    );
};

export default Success;
