import { Button, Checkbox, Form, Input} from "antd";
import React from "react";
import styles from './SingIn.module.scss'
import { GooglePlusOutlined } from "@ant-design/icons";
import { useResize } from "@hooks/useResize";



const SingIn:React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

     const defaultPrefixCls = 'e-mail:'
    const {width} = useResize()
    return   <Form
    name="basic"
    wrapperCol={{ span: 24 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <div className={styles.input_container}>
    <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
          },
          {
            required: false
          },
        ]}
        help=""
      >
        <Input addonBefore={defaultPrefixCls}  style={{width:'100%'}}/>
      </Form.Item>

    <Form.Item
      name="password"
      rules={[{ required: false }]}
    >
      <Input.Password />
    </Form.Item>
    </div>
    
    <div className={styles.check_container}>
    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 24 }}>
      <Checkbox>Запомнить меня</Checkbox>
    </Form.Item>
    <button className={styles.check_button}>Забыли пароль?</button>
    </div>

    <div className={styles.button_container}>
    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
      <Button type="primary" htmlType="submit" style={{width:'100%'}}>
        Войти
      </Button>
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
      <Button  htmlType="submit" style={{width:'100%', color:'rgb(38,38,38,1)', border: '1px solid #d9d9d9'}} icon={width<600?'':<GooglePlusOutlined />}>
        Войти через Google
      </Button>
    </Form.Item>
    </div>
  </Form>
}

export default SingIn