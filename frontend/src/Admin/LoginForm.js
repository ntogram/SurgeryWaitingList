import React,{useEffect,useState} from 'react';
import { Form, Input, Button,notification} from 'antd';
import { UserOutlined, LockOutlined,LoginOutlined,UndoOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AdminPageHeader from './AdminPageHeader'
import { useAuth } from '../Auth/AuthManager';


const LoginForm = () => {
   // Create form instance
   const [form] = Form.useForm();
   const { auth,signIn } = useAuth();
   const navigate = useNavigate();
   const [api, contextHolder] = notification.useNotification();
   // Handle form submission 
   const submitForm = async (values) => {
   // retriece form values
    const username = values["username"];
    const password = values["password"];
    console.log('Success:');
    console.log("username:",username);
    console.log("password:", password);
     // call login operation
    const response= await signIn(username,password);
    console.log(response)
    console.log(auth)
    if (response["isLoggedIn"]==true){
        // Redirect to /admin/manage
        navigate('/admin/manage');
    }
    else{
      // open notification for login failure
      const errorObj = response["errorMessage"]
     
      let errorMsg = "";
      if ("response" in errorObj){
        errorMsg = errorObj["response"]["data"]["errorMessage"]
        

      }
      else{
        console.log(errorObj["message"])
        errorMsg = errorObj["message"]// may need fix for other types of error
      }
      // display notification for login failure
      api.error({
        message: 'Αποτυχία Σύνδεσης',
        description:errorMsg
      });
      console.log(errorMsg)

    }
   




     // You can use this data to call an API for login authentication
   };
 
   // Handle reset
   const handleReset = () => {
     form.resetFields(); // Reset the form fields
   };
  
   useEffect(() => {
      console.log(auth)
      if ("errorMessage" in auth){
        /// destroy existing notification alert for logout error
        const notificationId= "LogOutError"
        api.destroy(notificationId)
        // display  error for logout
        console.log(auth)
        if (typeof auth["errorMessage"] === "string") {
                api.error({
                  message: 'Πρόβλημα Αποσύνδεσης',
                  description:auth["errorMessage"],
                  key: notificationId
                });
      }
      else if (typeof auth["errorMessage"] === "object" && auth["errorMessage"].isAxiosError){
        let errorObj = auth["errorMessage"];
        console.log(errorObj)
        if ("response" in errorObj){
              let requestURL = errorObj["response"]["request"]["responseURL"];
              if (!requestURL.includes("login")){
                const errorMsg = errorObj["response"]["data"]["msg"]
                api.error({
                  message: 'Πρόβλημα Δικτύου',
                  description:errorMsg,
                  key: notificationId
                });
              }
            }
           


      }






      
       
      }
      
     


   }, [auth]);



  return (
    
    <div>
      {contextHolder}
      <AdminPageHeader adminPageName={'Σύνδεση'}/>

    <div style={{ width: '15%', margin: '5% auto' }}>
     
      <Form
        name="login_form"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={submitForm}
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
    </div>
  );
};

export default LoginForm;