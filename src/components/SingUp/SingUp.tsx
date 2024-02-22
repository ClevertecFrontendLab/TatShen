import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';

import styles from './SingUp.module.scss';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useResize } from '@hooks/useResize';
import { enterApi } from '../../services/EnterService';
import { validateEmail, validatePassword } from '../../utils/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setEmail, setPassword } from '@redux/userReducer';
import { IServerErrorResponse } from '../../types/enterTypes';
import { useLocation, useNavigate } from 'react-router-dom';
import * as ROUTERS from '../../constants/router';
import { IForm, initialFormState } from '@pages/auth-page/types';
import { setIsLoading } from '@redux/loaderReducer';

const SingUp: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { email, password } = useAppSelector((state) => state.user);

    const fromPage = location.state?.from;

    const [
        registrationUser,
        {
            isError: isErrorForRegistration,
            isLoading: isLoadingForRegistration,
            isSuccess: isSuccessForRegistration,
            error: registrationError,
        },
    ] = enterApi.useRegistrationMutation();

    const defaultPrefixCls = 'e-mail:';
    const [formState, setFormState] = useState<IForm>(initialFormState);
    const { width } = useResize();

    const handleRegistration = () => {
        registrationUser({ email, password });
    };

    const handleChangeEmail = (e: { target: { value: string } }) => {
        setFormState((formState) => ({
            ...formState,
            email: e.target.value,
            isEmailValid: validateEmail(e.target.value),
        }));
        dispatch(setEmail(e.target.value));
    };

    const handleChangePassword = (e: { target: { value: string } }) => {
        setFormState((formState) => ({
            ...formState,
            password: e.target.value,
            isPasswordValid: validatePassword(e.target.value),
        }));
        dispatch(setPassword(e.target.value));
    };

    const isFormValid =
        formState.isEmailValid && formState.isPasswordValid && formState.isRepeatPasswordValid;

    const handleChangeRepeatPassword = (e: { target: { value: string } }) => {
        setFormState((formState) => ({
            ...formState,
            repeatPassword: e.target.value,
            isRepeatPasswordValid:
                validatePassword(e.target.value) && formState.password === e.target.value,
        }));
        dispatch(setPassword(e.target.value));
    };
    useEffect(() => {
        if (isLoadingForRegistration) {
            dispatch(setIsLoading(true));
        } else dispatch(setIsLoading(false));
    }, [dispatch, isLoadingForRegistration]);

    useEffect(() => {
        if (isErrorForRegistration && registrationError) {
            if ((registrationError as IServerErrorResponse).status.toString() === '409') {
                navigate(`/result/${ROUTERS.ERROR_USER_EXIST}`);
            } else if (isErrorForRegistration) {
                navigate(`/result/${ROUTERS.RESULT_ERROR}`);
            }
        }
    }, [
        isErrorForRegistration,
        isLoadingForRegistration,
        isSuccessForRegistration,
        navigate,
        registrationError,
        registrationUser,
    ]);

    useEffect(() => {
        if (isSuccessForRegistration) {
            navigate(`/result/${ROUTERS.SUCCESS}`);
        }
    }, [isSuccessForRegistration, navigate]);

    useEffect(() => {
        if (fromPage == '/result/error') {
            registrationUser({ email, password });
        }
    }, [email, fromPage, password, registrationUser]);

    return (
        <Form
            wrapperCol={{ span: 24 }}
            name='register'
            onFinish={handleRegistration}
            scrollToFirstError
        >
            <div className={styles.input_container}>
                <Form.Item
                    name='email'
                    validateStatus={
                        formState.email && !formState.isEmailValid ? 'error' : 'success'
                    }
                    validateTrigger='onChange'
                    help=''
                >
                    <Input
                        addonBefore={defaultPrefixCls}
                        style={{ width: '100%' }}
                        onChange={(e) => handleChangeEmail(e)}
                        data-test-id='registration-email'
                    />
                </Form.Item>

                <Form.Item
                    help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    name='password'
                    validateStatus={
                        formState.password && !formState.isPasswordValid ? 'error' : 'success'
                    }
                    validateTrigger='onChange'
                >
                    <Input.Password
                        placeholder='Пароль'
                        onChange={(e) => handleChangePassword(e)} 
                        data-test-id='registration-password'
                    />
                </Form.Item>

                <Form.Item
                    name='confirm'
                    dependencies={['password']}
                    validateStatus={
                        formState.repeatPassword && !formState.isRepeatPasswordValid
                            ? 'error'
                            : 'success'
                    }
                    validateTrigger='onChange'
                    help='Пароли не совпадают'
                >
                    <Input.Password
                        placeholder='Повторите пароль'
                        onChange={(e) => handleChangeRepeatPassword(e)}
                        data-test-id='registration-confirm-password'
                    />
                </Form.Item>
            </div>
            <div className={styles.button_container}>
                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                    <Button
                        htmlType='submit'
                        style={{ width: '100%' }}
                        className={isFormValid ? styles.enterButton : styles.disabledButton}
                        data-test-id='registration-submit-button'
                    >
                        Войти
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                    <Button
                        htmlType='submit'
                        style={{
                            width: '100%',
                            color: 'rgb(38,38,38,1)',
                            border: '1px solid #d9d9d9',
                        }}
                        icon={width < 600 ? '' : <GooglePlusOutlined />}
                    >
                        Регистрация через Google
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default SingUp;
