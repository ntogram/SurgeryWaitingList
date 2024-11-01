import {React,useState} from 'react';
import { DatePicker, Form,Button,Popconfirm,Typography, Space } from 'antd';
import {DeleteOutlined,QuestionCircleFilled} from '@ant-design/icons';
import AdminPageHeader from './AdminPageHeader'
import dayjs from "dayjs";


const { RangePicker } = DatePicker;
const { Title} = Typography;


const AdminPanel = () => {

 const maxDate = dayjs();
 // Create form instance
 const [form] = Form.useForm();
 const [formCompleted, setFormCompleted] = useState(false);

// Function to check if form is completed
const handleFormChange = () => {
  //  when hasErrors is true when form is not completed or is completed wrongly in this case formCompleted=false otherwise 
  // hasErrors=false  and formCompleted=true
  const hasErrors = form
    .getFieldsError()
    .some(({ errors }) => errors.length > 0);
    console.log(hasErrors)
  setFormCompleted(!hasErrors);

};



 // Handle form submission
 const onFinish = (values) => {
   console.log('Success:', values);
   // You can use this data to call an API for login authentication
 };

const disableFutureDates = (current) =>{

  return current && current > maxDate;

}



    return <div>
    <AdminPageHeader adminPageName={'Επεξεργασία'}/>
    <Space direction='vertical' align='center'>
    <Form
    name="basic"
    form={form} 
    initialValues={{ remember: true}}
    onFieldsChange={handleFormChange}
    autoComplete="off"
    onFinish={onFinish}
    
  > 
  
   <Form.Item
  label="Χρονικό Διάστημα"
  name="dateRange"
  rules={[{ required: true, message: 'Παρακαλώ δώστε χρονικό διάστημα' }]}>
        <RangePicker disabledDate={disableFutureDates} />
   </Form.Item>
   {formCompleted ?
   <Popconfirm 
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
   </Popconfirm>:<Button type="primary" htmlType="submit" danger  icon={<DeleteOutlined />} className="login-form-button">
                    Διαγραφή
        </Button>}




    </Form>
    </Space>
    </div>
}

export default AdminPanel;