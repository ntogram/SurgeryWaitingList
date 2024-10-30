import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined,LoginOutlined,UndoOutlined} from '@ant-design/icons';

const LoginForm = () => {
   // Create form instance
   const [form] = Form.useForm();

   // Handle form submission
   const onFinish = (values) => {
     console.log('Success:', values);
     // You can use this data to call an API for login authentication
   };
 
   // Handle reset
   const handleReset = () => {
     form.resetFields(); // Reset the form fields
   };

  return (
    <div style={{ width: '15%', margin: '5% auto' }}>
      <Form
        name="login_form"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Παρακλώ εισάγετε όνομα χρήστη!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Όνομα Χρήστη"
          
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Παρακαλώ εισάγεται κωδικό πρόσβασης!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Κωδικός Πρόσβασης"
            
          />
        </Form.Item>

        

        <Form.Item>
        
            <Button type="primary" htmlType="submit"  icon={<LoginOutlined/>} className="login-form-button">
            Σύνδεση
            </Button>
          <Button type="primary" htmlType="reset" danger onClick={handleReset} icon={<UndoOutlined />} style={{ marginLeft: '5%' }}>
            Kαθαρισμός
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;