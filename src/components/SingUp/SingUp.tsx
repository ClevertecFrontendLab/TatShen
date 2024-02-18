import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";

import styles from './SingUp.module.scss'
import { GooglePlusOutlined } from "@ant-design/icons";
import { useResize } from "@hooks/useResize";
import { enterApi } from "../../services/EnterService";
import debounce from '../../utils/debounce'
import {validateEmail, validatePassword} from '../../utils/index'
import { useAppDispatch} from "@hooks/typed-react-redux-hooks";
import { setEmail, setPassword } from "@redux/userReducer";
import { IServerErrorResponse } from "../../types/enterTypes";
import { useNavigate } from "react-router-dom";
import * as ROUTERS from '../../constants/router'
import { Loader } from "@components/Loader/Loader";

interface ISingUpForm{
  email: string;
  password: string;
  repeatPassword: string;
  emailValid:boolean;
  passwordValid: boolean;
  repeatPasswordValid: boolean
}

const initialFormState: ISingUpForm ={
  email:'',
  password:'',
  repeatPassword:'',
  emailValid:false,
  passwordValid:false,
  repeatPasswordValid:false
}

const SingUp:React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  
  const [registrationUser, {
    isError : isErrorForRegistration, 
    isLoading: isLoadingForRegistration, 
    isSuccess:isSuccessForRegistration, 
    error: registrationError}] = enterApi.useRegistrationMutation()

  const defaultPrefixCls = 'e-mail:'
  const [formState, setFormState] = useState<ISingUpForm>(initialFormState)
  const {width} = useResize()
  console.log(formState);
  

  const handleRegistration =  () => {
    const email = formState.email
    const password = formState.password
    registrationUser({email, password})
  }

  const handleChangeEmail = debounce((e: { target: { value: string; }; }) => { setFormState(formState => ({
      ...formState, 
      email: e.target.value,
      emailValid: validateEmail(e.target.value)
    }))
    formState.emailValid && dispatch(setEmail(e.target.value))
    }, 1500)

  const handleChangePassword = debounce((e: { target: { value: string; }; }) => { setFormState(formState => ({
      ...formState, 
      password: e.target.value,
      passwordValid: validatePassword(e.target.value)
    }))
    }, 1500)

    const isFormValid = formState.emailValid && formState.passwordValid && formState.repeatPasswordValid 

    const handleChangeRepeatPassword = debounce((e: { target: { value: string; }; }) => { setFormState(formState => ({
      ...formState, 
      repeatPassword: e.target.value,
      repeatPasswordValid: formState.password === e.target.value
    }))
    formState.repeatPasswordValid && dispatch(setPassword(e.target.value))
    }, 1500)

    useEffect(()=>{
        if(isErrorForRegistration && registrationError){
          if ((registrationError as IServerErrorResponse).status.toString() === '409'){
            navigate(ROUTERS.ERROR_USER_EXIST_WITH_EMAIL)
          } else if(isErrorForRegistration){
            navigate(ROUTERS.ERROR_UNKNOWN)
          }
        }
    }, [isErrorForRegistration, navigate, registrationError])

    useEffect(()=>{
      if(isSuccessForRegistration){
        navigate(ROUTERS.SUCCESS)
      }
  }, [isSuccessForRegistration, navigate])

  useEffect(()=>{
     if(isLoadingForRegistration){
      <Loader></Loader>
     }
  }, [isLoadingForRegistration])
    
    return <Form
      wrapperCol={{ span: 24 }}
      name="register"
      onFinish={handleRegistration}
      scrollToFirstError
    >
      <div className={styles.input_container}>
      <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}

          >
            <Input addonBefore={defaultPrefixCls} style={{width:'100%'}} onChange={(e)=> handleChangeEmail(e)}/>
          </Form.Item>

          <Form.Item extra="Пароль не менее 8 символов, с заглавной буквой и цифрой"
            name="password"
            rules={[
              {
                required: true,
                message: '',
              },
            ]}
          >
            <Input.Password placeholder="Пароль" onChange={(e)=> handleChangePassword(e)}/>
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: '',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(''));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Повторите пароль" onChange={(e)=> handleChangeRepeatPassword(e)}/>
          </Form.Item>
      </div>
      <div className={styles.button_container}>
        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button htmlType="submit" style={{width:'100%', background:`${isFormValid ? '#061178' : 'transparent'}`}} disabled={!isFormValid}>
            Войти
          </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button  htmlType="submit" style={{width:'100%', color:'rgb(38,38,38,1)', border: '1px solid #d9d9d9'}} icon={width<600?'':<GooglePlusOutlined />}>
            Регистрация через Google
          </Button>
      </Form.Item>
      </div>
          


    </Form>

}

export default SingUp