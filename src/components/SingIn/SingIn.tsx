import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useResize } from '@hooks/useResize';
import { setLocalStorageItem, validateEmail, validatePassword } from '../../utils/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { setEmail, setPassword, setToken, setAuth } from '@redux/userReducer';

import styles from './SingIn.module.scss';
import {
    useLoginWithGoogleQuery,
    useLoginMutation,
    useCheckEmailMutation,
} from '../../services/EnterService';
import { LOCAL_STORAGE } from '@constants/localStorage';
import { CONFIRM_EMAIL, ERROR_EMAIL_NO_EXIST, ERROR_LOGIN, ERROR_NETWORK, HOMEPAGE } from '@constants/router';
import { Loader } from '@components/Loader/Loader';
import { IServerErrorResponse } from '../../types/enterTypes';
import { IForm, initialFormState } from '@pages/auth-page/types';



const SingIn: React.FC = () => {
    const [formState, setFormState] = useState<IForm>(initialFormState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation()

    const lastPage = location.state?.from.pathname
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
      checkEmail({email})
    }


    const handleChangeEmail = (e: { target: { value: string } }) => {
        setFormState((formState) => ({
            ...formState,
            email: e.target.value,
            isEmailValid: validateEmail(e.target.value),
        }));
        dispatch(setEmail(e.target.value))
    };

    const handleChangePassword =(e: { target: { value: string } }) => {
        setFormState((formState) => ({
            ...formState,
            password: e.target.value,
            isPasswordValid: validatePassword(e.target.value),
        }));
        dispatch(setPassword(e.target.value))
    };

    const isFormValid = formState.isEmailValid && formState.isPasswordValid;

    const defaultPrefixCls = 'e-mail:';
    const { width } = useResize();

    useEffect(()=> {
      if(isSuccessCheckEmail){
        navigate(CONFIRM_EMAIL, {state: {from:location}})
      } else if (isErrorCheckEmail && checkEmailError){
        if((checkEmailError as IServerErrorResponse).status.toString() === '404' && (checkEmailError as IServerErrorResponse).data.message == 'Email не найден'){
          navigate(`/result/${ERROR_EMAIL_NO_EXIST}`)
        } else { navigate( `/result/${ERROR_NETWORK}`)}
      }
    }, [checkEmailError, isErrorCheckEmail, isSuccessCheckEmail, location, navigate])

   useEffect(()=> {
        if(lastPage === '/result/error-check-email'){
            checkEmail({email})
        }
   }, [checkEmail, email, lastPage])

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
        } else if(isErrorLogin){ navigate(`/result/${ERROR_LOGIN}`)}
    }, [dispatch, isErrorLogin, isSuccessLogin, loginData, navigate, rememberMe]);


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
                    validateStatus={formState.email && !formState.isEmailValid ? 'error' : 'success'}
                    validateTrigger='onChange'
                    
                >
                    <Input
                        addonBefore={defaultPrefixCls}
                        style={{ width: '100%' }}
                        onChange={(e) => handleChangeEmail(e)}
                    />
                </Form.Item>

                <Form.Item name='password' validateStatus={formState.password && !formState.isPasswordValid? 'error' : 'success'}
                    validateTrigger='onChange'>
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
                <button className={formState.isEmailValid ? styles.check_button : styles.check_button_disabled } onClick={handlerRetrievalPassword}>Забыли пароль?</button>
            </div>

            <div className={styles.button_container}>
                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                    <Button
                        htmlType='submit'
                        style={{ width: '100%' }}
                        className={isFormValid ? styles.enterButton : styles.disabledButton }
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
