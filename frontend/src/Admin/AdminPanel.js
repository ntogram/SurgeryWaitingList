import React from 'react';
import { DatePicker, Form,Button,Popconfirm,Typography } from 'antd';
import {DeleteOutlined,QuestionCircleFilled} from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { Title} = Typography;


const AdminPanel = () => {
 // Create form instance
 const [form] = Form.useForm();

 // Handle form submission
 const onFinish = (values) => {
   console.log('Success:', values);
   // You can use this data to call an API for login authentication
 };



    return <Form
    name="basic"
    form={form} 
    initialValues={{ remember: true}}
    style={{ maxWidth: '20%', width: '100%' }} 
    autoComplete="off"
    onFinish={onFinish}
  > 
  
   <Form.Item
  label="Χρονικό Διάστημα"
  name="dateRange"
  rules={[{ required: true, message: 'Παρακαλώ δώστε χρονικό διάστημα' }]}>
        <RangePicker />
   </Form.Item>
   <Popconfirm disabled={false}
    title={<Title level={4} type={"warning"}>Ειδοποίηση Διαγραφής</Title>}
    description={<Title level={5} type={"warning"} italic={true} strong={true}>Είστε σίγουροι ότι θέλετε να διαγράψετε τις εγγραφές των χειρουργείων για την συγκεκριμένη χρονική περίοδο;</Title>}
    cancelText= {<Title level={4} type={"warning"} italic={true} strong={true}>Όχι</Title>} cancelButtonProps={{danger:true,variant:"solid",type:"primary",size:"large"}} 
    okButtonProps={{size:"large",
        style: {
          backgroundColor: '#28a745'
        },
      }}
    okText={<Title level={4} type={"warning"} italic={true} strong={true}>Ναι</Title>}
    
    icon={<QuestionCircleFilled />} 
  >
        <Button type="primary" htmlType="submit" danger  icon={<DeleteOutlined />} className="login-form-button">
                    Διαγραφή
        </Button>
   </Popconfirm>



    </Form>
}

export default AdminPanel;