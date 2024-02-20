import Modal from '@components/Modal/Modal';
import React, { useEffect, useState } from 'react';
import styles from './change-password.module.scss';


import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useChangePasswordMutation } from '../../../services/EnterService';
import { setCode, setPassword } from '@redux/userReducer';
import { Loader } from '@components/Loader/Loader';
import { Button, Form, Input } from 'antd';
import { IChangePasswordForm, initialChangePasswordFormState } from '../types';
import { validatePassword } from '@utils/index';

const ChangePassword: React.FC = () => {
    const [formState, setFormState] = useState<IChangePasswordForm>(initialChangePasswordFormState) 
    const {email} = useAppSelector(state => state.user)
    
    const dispatch = useAppDispatch()
  
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
      dispatch(setPassword(e.target.value))
      }

   
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
                            <Input.Password placeholder="Пароль" onChange={(e)=> handleChangePassword(e)}/>
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            validateStatus={formState.repeatPassword && !formState.isRepeatPasswordValid? 'error' : 'success'}
                            validateTrigger='onChange'
                            help='Пароли не совпадают'>
                            <Input.Password placeholder="Повторите пароль" onChange={(e)=> handleChangeRepeatPassword(e)}/>
                        </Form.Item>
                    </div>
                    
                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                        <Button style={{width:'100%'}} htmlType="submit" onClick={}>
                        Сохранить
                        </Button>
                    </Form.Item>
    </Form>
            </div>
        </Modal>
    );
};

export default ChangePassword;
