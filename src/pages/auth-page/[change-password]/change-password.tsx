import Modal from '@components/Modal/Modal';
import React, { useEffect, useState } from 'react';
import styles from './change-password.module.scss';


import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useChangePasswordMutation } from '../../../services/EnterService';
import { setPassword } from '@redux/userReducer';
import { Button, Form, Input } from 'antd';
import { IChangePasswordForm, initialChangePasswordFormState } from '../types';
import { validatePassword } from '@utils/index';
import { ERROR_CHANGE_PASSWORD, SUCCESS_CHANGE_PASSWORD } from '@constants/router';
import { useLocation, useNavigate } from 'react-router-dom';
import { setIsLoading } from '@redux/loaderReducer';

const ChangePassword: React.FC = () => {
    const [formState, setFormState] = useState<IChangePasswordForm>(initialChangePasswordFormState) 
    const {password} = useAppSelector((state) => state.user)
    const [changePassword, {
        isError: isChangePaswordError,
        isLoading: isChangePasswordLoading,
        isSuccess: isChangePasswordSuccess,
      }] = useChangePasswordMutation()
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const lastPage = location.state?.from.pathname
  
    const handleChangePassword = (e: { target: { value: string; }; }) => { setFormState(formState => ({
        ...formState, 
        password: e.target.value,
        isPasswordValid: validatePassword(e.target.value)
      }))
      
      }

      const handleChangeRepeatPassword = (e: { target: { value: string; }; }) => { setFormState(formState => ({
        ...formState, 
        repeatPassword: e.target.value,
        isRepeatPasswordValid:validatePassword(e.target.value) && formState.password === e.target.value 
      }))
      }

      const handleSubmit = () => {
        dispatch(setPassword(formState.password))
        changePassword({password:password, confirmPassword: password})
      }

      useEffect(()=> {
        if (isChangePasswordLoading){
            dispatch(setIsLoading(true))
        } else if(isChangePasswordSuccess){
            dispatch(setIsLoading(false))
            navigate(`/result/${SUCCESS_CHANGE_PASSWORD}`)
        } else if (isChangePaswordError){
            dispatch(setIsLoading(false))
            navigate(`/result/${ERROR_CHANGE_PASSWORD}`)
        }
      }, [dispatch, isChangePasswordLoading, isChangePasswordSuccess, isChangePaswordError, location, navigate])
     
      useEffect(()=> {
        if(lastPage === '/result/error-change-password'){
            changePassword({password:password, confirmPassword: password})
        }
      },[changePassword, lastPage, password])
    return (
        <Modal className={styles.code_container}>
            <div className={styles.content}>
                <h2>Восстановление аккауанта</h2>
                <Form
                    name="basic"
                    labelCol={{ span: 0 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    >
                    <div className={styles.input_container}>
                        <Form.Item help="Пароль не менее 8 символов, с заглавной буквой и цифрой"
                            name="password"
                            validateStatus={formState.password && !formState.isPasswordValid? 'error' : 'success'}
                            validateTrigger='onChange'>
                            <Input.Password placeholder="Пароль" onChange={(e)=> handleChangePassword(e)} data-test-id='change-password'/>
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            validateStatus={formState.repeatPassword && !formState.isRepeatPasswordValid? 'error' : 'success'}
                            validateTrigger='onChange'
                            help='Пароли не совпадают'>
                            <Input.Password placeholder="Повторите пароль" onChange={(e)=> handleChangeRepeatPassword(e)} data-test-id='change-confirm-password'/>
                        </Form.Item>
                    </div>
                    
                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                        <Button style={{width:'100%'}} htmlType="submit" onClick={handleSubmit} data-test-id='change-submit-button'>
                        Сохранить
                        </Button>
                    </Form.Item>
    </Form>
            </div>
        </Modal>
    );
};

export default ChangePassword;
