import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useResize } from '@hooks/useResize';
import { setLocalStorageItem, setSessionStorage, validateEmail, validatePassword } from '../../utils/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { setEmail, setPassword, setToken, setAuth } from '@redux/userReducer';

import styles from './SingIn.module.scss';
import {
    useLoginMutation,
    useCheckEmailMutation,
} from '../../services/EnterService';
import { LOCAL_STORAGE } from '@constants/localStorage';
import { CONFIRM_EMAIL, ERROR_CHECK_EMAIL, ERROR_EMAIL_NO_EXIST, ERROR_LOGIN,  HOMEPAGE } from '@constants/router';
import { IServerErrorResponse } from '../../types/enterTypes';
import { IForm, initialFormState } from '@pages/auth-page/types';
import { setIsLoading } from '@redux/loaderReducer';




const SingIn: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const googleToken = searchParams.get('accessToken');
    console.log(googleToken);
    
    const [formState, setFormState] = useState<IForm>(initialFormState);
    const lastPage = location.state?.from.pathname
    const { email, password } = useAppSelector((state) => state.user); 
    const [checkEmail, {
      isError: isErrorCheckEmail,
      isLoading: isLoadingCheckEmail,
      isSuccess: isSuccessCheckEmail,
      error: checkEmailError}] = useCheckEmailMutation();

    const [rememberMe, setRememberMe] = useState(false);
    const [
        login,
        {
            isError: isErrorLogin,
            isLoading: isLoadingLogin,
            isSuccess: isSuccessLogin,
            data: loginData,
        },
    ] = useLoginMutation();
    const isFormValid = formState.isEmailValid && formState.isPasswordValid


    const handlerLogin = () => {
        if(isFormValid){login({ email, password })}
    };

    const handlerLoginWithGoogle = async () => {
        window.location.href = 'https://marathon-api.clevertec.ru/auth/google';

    };

    const handlerRetrievalPassword = () => {
        if(formState.isEmailValid){
            checkEmail({email})
        }
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

    
    const defaultPrefixCls = 'e-mail:';
    const { width } = useResize();

    useEffect(()=> {
      if(isSuccessCheckEmail){
        navigate(CONFIRM_EMAIL, {state: {from:location}})
      } else if (isErrorCheckEmail && checkEmailError){
        if((checkEmailError as IServerErrorResponse).status.toString() === '404' && (checkEmailError as IServerErrorResponse).data.message == 'Email не найден'){
          navigate(`/result/${ERROR_EMAIL_NO_EXIST}`)
        } else { navigate( `/result/${ERROR_CHECK_EMAIL}`)}
      }
    }, [checkEmailError, isErrorCheckEmail, isSuccessCheckEmail, location, navigate])

   useEffect(()=> {
        if(lastPage === '/result/error-check-email'){
            checkEmail({email})
        }
   }, [checkEmail, email, lastPage])

    useEffect(() => {
        if (isLoadingLogin || isLoadingCheckEmail) {
            dispatch(setIsLoading(true))
        } else (dispatch(setIsLoading(false)))
    }, [dispatch, isLoadingCheckEmail, isLoadingLogin]);

    useEffect(() => {            
        if (isSuccessLogin && loginData && 'accessToken' in loginData) {
            dispatch(setToken(loginData.accessToken));
            dispatch(setAuth(true));
            rememberMe ? setLocalStorageItem(LOCAL_STORAGE, loginData.accessToken) : setSessionStorage(LOCAL_STORAGE, loginData.accessToken);
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
                        data-test-id='login-email'
                    />
                </Form.Item>

                <Form.Item name='password' validateStatus={formState.password && !formState.isPasswordValid? 'error' : 'success'}
                    validateTrigger='onChange'>
                    <Input.Password onChange={(e) => handleChangePassword(e)} data-test-id='login-password'/>
                </Form.Item>
            </div>

            <div className={styles.check_container}>
                <Form.Item
                    name='remember'
                    valuePropName='checked'
                    wrapperCol={{ offset: 0, span: 24 }}
                >
                    <Checkbox  onChange={() => setRememberMe(!rememberMe)} data-test-id='login-remember'>Запомнить меня</Checkbox>
                </Form.Item>
                <button className={styles.check_button} onClick={handlerRetrievalPassword} data-test-id='login-forgot-button'>Забыли пароль?</button>
            </div>

            <div className={styles.button_container}>
                <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                    <Button
                        htmlType='submit'
                        style={{ width: '100%' }}
                        className={ styles.enterButton}
                        onClick={handlerLogin}
                        data-test-id='login-submit-button'
                    > Войти </Button>
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
