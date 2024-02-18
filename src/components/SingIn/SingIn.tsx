import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useResize } from '@hooks/useResize';
import debounce from '@utils/debounce';
import { setLocalStorageItem, validateEmail, validatePassword } from '../../utils/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useNavigate } from 'react-router-dom';
import { setEmail, setPassword, setToken, setAuth } from '@redux/userReducer';

import styles from './SingIn.module.scss';
import {
    useLoginWithGoogleQuery,
    useLoginMutation,
    useCheckEmailMutation,
} from '../../services/EnterService';
import { LOCAL_STORAGE } from '@constants/localStorage';
import { CODE, ERROR_EMAIL, ERROR_LOGIN, ERROR_NETWORK, HOMEPAGE } from '@constants/router';
import { Loader } from '@components/Loader/Loader';
import { IServerErrorResponse } from '../../types/enterTypes';

interface ISingInForm {
    email: string;
    password: string;
    isEmailValid: boolean;
    isPasswordValid: boolean;
}

const initialFormState: ISingInForm = {
    email: '',
    password: '',
    isEmailValid: false,
    isPasswordValid: false,
};

const SingIn: React.FC = () => {
    const [formState, setFormState] = useState<ISingInForm>(initialFormState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { email, password } = useAppSelector((state) => state.user);
    const [checkEmail, {
      isError: isErrorCheckEmail,
      isLoading: isLoadingCheckEmail,
      isSuccess: isSuccessCheckEmail,
      error: checkEmailError}] = useCheckEmailMutation();

    const [rememberMe, setRememberMe] = useState(true);
    const [
        login,
        {
            isError: isErrorLogin,
            isLoading: isLoadingLogin,
            isSuccess: isSuccessLogin,
            data: loginData,
        },
    ] = useLoginMutation();

    const handlerLogin = () => {
        login({ email, password });
    };

    const handlerLoginWithGoogle = () => {
        console.log('сделаю потом');
    };

    const handlerRetrievalPassword = () => {
      checkEmail({email:formState.email})
    }

    console.log(formState);

    const handleChangeEmail = debounce((e: { target: { value: string } }) => {
        setFormState((formState) => ({
            ...formState,
            email: e.target.value,
            isEmailValid: validateEmail(e.target.value),
        }));
    }, 1500);

    const handleChangePassword = debounce((e: { target: { value: string } }) => {
        setFormState((formState) => ({
            ...formState,
            password: e.target.value,
            isPasswordValid: validatePassword(e.target.value),
        }));
    }, 1500);

    const isFormValid = formState.isEmailValid && formState.isPasswordValid;

    const defaultPrefixCls = 'e-mail:';
    const { width } = useResize();

    useEffect(() => {
        if (isFormValid) {
            dispatch(setEmail(formState.email));
            dispatch(setPassword(formState.password));
        }
    });

    useEffect(()=> {
      if(isSuccessCheckEmail){
        navigate(CODE)
      }
    }, [isSuccessCheckEmail, navigate])

    useEffect(()=> {
      if(isErrorCheckEmail && checkEmailError){
        if((checkEmailError as IServerErrorResponse).status === '404' && (checkEmailError as IServerErrorResponse).data.message === 'Email не найден'){
          navigate(ERROR_EMAIL)
        } else { navigate(ERROR_NETWORK)}
      }
    }, [checkEmailError, isErrorCheckEmail, navigate])

    useEffect(() => {
        if (isLoadingLogin || isLoadingCheckEmail) {
            <Loader></Loader>;
        }
    }, [isLoadingCheckEmail, isLoadingLogin]);

    useEffect(() => {
        if (isSuccessLogin && loginData && 'accessToken' in loginData) {
            dispatch(setToken(loginData.accessToken));
            dispatch(setAuth(true));
            rememberMe && setLocalStorageItem(LOCAL_STORAGE, loginData.accessToken);
            navigate(HOMEPAGE);
        }
    }, [dispatch, isSuccessLogin, loginData, navigate, rememberMe]);

    useEffect(() => {
        if (isErrorLogin) {
            navigate(ERROR_LOGIN);
        }
    }, [isErrorLogin, navigate]);

    return (
        <Form
            name='basic'
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: rememberMe }}
            autoComplete='off'
        >
            <div className={styles.input_container}>
                <Form.Item
                    name='email'
                    rules={[
                        {
                            type: 'email',
                        },
                        {
                            required: false,
                        },
                    ]}
                    help=''
                >
                    <Input
                        addonBefore={defaultPrefixCls}
                        style={{ width: '100%' }}
                        onChange={(e) => handleChangeEmail(e)}
                    />
                </Form.Item>

                <Form.Item name='password' rules={[{ required: false }]}>
                    <Input.Password onChange={(e) => handleChangePassword(e)} />
                </Form.Item>
            </div>

            <div className={styles.check_container}>
                <Form.Item
                    name='remember'
                    valuePropName='checked'
                    wrapperCol={{ offset: 0, span: 24 }}
                >
                    <Checkbox onChange={() => setRememberMe(!rememberMe)}>Запомнить меня</Checkbox>
                </Form.Item>
                <button className={styles.check_button} onClick={handlerRetrievalPassword}>Забыли пароль?</button>
            </div>

            <div className={styles.button_container}>
                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                    <Button
                        type='primary'
                        htmlType='submit'
                        style={{ width: '100%' }}
                        disabled={!isFormValid}
                        onClick={handlerLogin}
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
                        onClick={handlerLoginWithGoogle}
                    >
                        Войти через Google
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default SingIn;
