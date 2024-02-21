import Modal from '@components/Modal/Modal';
import React, { useEffect, useState } from 'react';
import styles from './confirm-email.module.scss';
import { CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import VerificationInput from 'react-verification-input';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useConfirmEmailMutation } from '../../../services/EnterService';
import { setCode } from '@redux/userReducer';
import { Loader } from '@components/Loader/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTH, CHANGE_PASSWORD } from '@constants/router';
import { setIsLoading } from '@redux/loaderReducer';


const Code: React.FC = () => {
    const { email, code } = useAppSelector((state) => state.user);
    const location = useLocation();
    const [modalState, setModalState] = useState(true);
    const lastPage = location.state?.from.pathname;

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const [
        confirmEmail,
        {
            isError: isErrorConfirmEmail,
            isLoading: isLoadingConfirmEmail,
            isSuccess: isSiccessConfirmEmail,
        },
    ] = useConfirmEmailMutation();


    const handleOnChange = (e: string) => {
        if (e.length == 6) {
            dispatch(setCode(e));
            confirmEmail({ email, code:e });
        }
    };

    useEffect(() => {
        if (lastPage !== '/auth') {
            navigate(AUTH);
        }
    }, [lastPage, navigate]);

    useEffect(() => {
        if (isErrorConfirmEmail) {
            setModalState(false);
        } else if(isSiccessConfirmEmail){
            navigate(`/auth/${CHANGE_PASSWORD}`)
        }
    }, [isErrorConfirmEmail, isSiccessConfirmEmail, navigate]);

    useEffect(() => {
        if (isLoadingConfirmEmail) {
            dispatch(setIsLoading(true))
        } else dispatch(setIsLoading(false))
    }, [dispatch, isLoadingConfirmEmail]);

    return (
        <Modal className={styles.code_container}>
            <div className={styles.content}>
                {modalState ? (
                    <ExclamationCircleFilled
                        style={{ color: ' #2f54eb' }}
                        className={styles.icon}
                    />
                ) : (
                    <CloseCircleFilled style={{ color: ' #ff4d4f' }} className={styles.icon} />
                )}
                <div className={styles.text_content} style={{ padding: '0px' }}>
                    {modalState ? (
                        <h2>Введите код для восстановления аккауанта</h2>
                    ) : (
                        <h2>Неверный код. Введите код для восстановления аккауанта</h2>
                    )}
                    <span className={styles.error_user_exist}>
                        Мы отправили вам на e-mail{' '}
                        <span style={{ fontWeight: '700' }}>{email}</span> шестизначный код. Введите
                        его в поле ниже.
                    </span>
                </div>
                {modalState ? <VerificationInput placeholder='' onChange={(e) => handleOnChange(e)}  inputProps={{
                'data-test-id': 'verification-input'}}/> : <VerificationInput placeholder='' onChange={(e) => handleOnChange(e)}  classNames={{ container: "Error_container"}}  inputProps={{'data-test-id': 'verification-input'}}/> } 
                <span className={styles.letter}>Не пришло письмо? Проверьте папку Спам.</span>
            </div>
        </Modal>
    );
};

export default Code;
