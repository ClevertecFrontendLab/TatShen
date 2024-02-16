import { Button, Form, Input } from "antd";
import React from "react";

import styles from './SingUp.module.scss'
import { GooglePlusOutlined } from "@ant-design/icons";
import { useResize } from "@hooks/useResize";

const SingUp:React.FC = () => {
  const defaultPrefixCls = 'e-mail:'
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
      };
      const {width} = useResize()


    
    return <Form
      wrapperCol={{ span: 24 }}
      name="register"
      onFinish={onFinish}
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
            help=""
          >
            <Input addonBefore={defaultPrefixCls} style={{width:'100%'}} />
          </Form.Item>

          <Form.Item extra="Пароль не менее 8 символов, с заглавной буквой и цифрой"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Пароль"/>
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Повторите пароль"/>
          </Form.Item>
      </div>
      <div className={styles.button_container}>
        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button type="primary" htmlType="submit" style={{width:'100%'}}>
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