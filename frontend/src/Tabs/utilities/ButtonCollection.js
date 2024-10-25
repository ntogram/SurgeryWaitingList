import React,{useState} from 'react'
import { Breadcrumb,Space,Typography,Button} from 'antd';
import {FilePdfOutlined,FileExcelOutlined,PrinterOutlined,ReloadOutlined} from '@ant-design/icons'
import RefreshButton from './RefreshButton';
import Filehandler from './Filehandler';
// put buttons in separate components
const ButtonCollection = ({columns,dataSource}) =>{
    const [refreshDateTime, setRefreshDateTime] = useState(new Date());
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
                    };
   
                    


     const toolboxItems =[
      {
        title:<RefreshButton refreshDateTime={setRefreshDateTime}/>
      },
      {
        title: <Filehandler dataSource={dataSource} columns={columns} op={"Εκτύπωση"}/>
      },
      {
        title: <Filehandler dataSource={dataSource} columns={columns} op={"Αποθήκευση PDF"}/>
      },
      {
        title:  <Filehandler dataSource={dataSource} columns={columns} op={"Αποθήκευση Excel"}/>
      },
      {
        title: refreshDateTime.toLocaleString('el-GR', options)
         
      }];
     
      return ( <Breadcrumb
        items={toolboxItems}
        separator=<Space/>
      />)
  
  
  
  
  }

  export default ButtonCollection;