import {React,useState} from 'react';
import { DatePicker, Form,Button,Popconfirm,Typography, Space,notification} from 'antd';
import {DeleteOutlined,QuestionCircleFilled} from '@ant-design/icons';
import AdminPageHeader from './AdminPageHeader'
import dayjs from "dayjs";
import { useAuth } from '../Auth/AuthManager';
import {deleteSurgeries} from '../services/serviceAPI'
const { RangePicker } = DatePicker;
const { Title} = Typography;


const AdminPanel = () => {
 const { auth,setAuth,hasValidokens,refreshSession} = useAuth();
 const maxDate = dayjs();
 // Create form instance
 const [form] = Form.useForm();
 const [formCompleted, setFormCompleted] = useState(false);
 const [api, contextHolder] = notification.useNotification();
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


const clearSurgeries = async ()=>{
  // check  tokens validity
  const tokenValidity=hasValidokens(auth.accessToken,auth.refreshToken);
  // acess token expired refresh it
  let access_token = auth.accessToken;
  let refresh_token =  auth.refreshToken;
  if (tokenValidity == 2){
    access_token = await refreshSession(refresh_token);
  }

  console.log("ok")
  // Retrieve date range criteria for delete
  const formData = form.getFieldsValue(); 
  const dateRange = formData.dateRange;
  console.log(dateRange)
  const startDate = dateRange[0].format("YYYY-MM-DD");
  const endDate = dateRange[1].format("YYYY-MM-DD");
  const response = await deleteSurgeries(auth.accessToken,startDate,endDate)
  console.log(response)
  let msg = response["message"]
  if ("expired" in response){
    console.log(msg)
    setAuth({ isLoggedIn: false, accessToken: null, refreshToken: null, errorMessage:msg });
  }
  else if  ("error" in response){
    api.error({message:"Σφάλμα Διαγραφής Χειρουργείων",description:msg})
  }
  else{
    api.success({
      message: 'Διαγραφή Χειρουργείων',
      description:msg
    });


  }

  
  //console.log("Start Date:", startDate);
  //console.log("End Date:", endDate);



}





    return <div>
      {contextHolder}
    <AdminPageHeader adminPageName={'Επεξεργασία'}/>
    <Space direction='vertical' align='center'>
    <Form
    name="basic"
    form={form} 
    initialValues={{ remember: true}}
    onFieldsChange={handleFormChange}
    autoComplete="off"
    
    
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
    onConfirm={clearSurgeries}
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