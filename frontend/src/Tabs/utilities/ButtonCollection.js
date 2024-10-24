import React,{useState} from 'react'
import { Breadcrumb,Space,Typography,Button} from 'antd';
import {FilePdfOutlined,FileExcelOutlined,PrinterOutlined,ReloadOutlined} from '@ant-design/icons'
import RefreshButton from './RefreshButton';
import PDFhandler from './PDFhandler';
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
        title: <PDFhandler dataSource={dataSource} columns={columns} op={"Εκτύπωση"}/>
      },
      {
        title: <PDFhandler dataSource={dataSource} columns={columns} op={"Αποθήκευση"}/>
      },
      {
        title:  <Button shape="circle" color="primary" variant="link" icon={<FileExcelOutlined/>}/>
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