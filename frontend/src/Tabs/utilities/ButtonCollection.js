import React,{useState} from 'react'
import { Breadcrumb,Space,Typography,Button} from 'antd';
import {FilePdfOutlined,FileExcelOutlined,PrinterOutlined,ReloadOutlined} from '@ant-design/icons'


const ButtonCollection = () =>{
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
    const refresh = () => {
                      console.log("f")
                      setRefreshDateTime(new Date()); // Update state with new date and time
                    };
     const toolboxItems =[
      {
        title: <Button shape="circle" color="primary" variant="link" icon={<ReloadOutlined/>} onClick={refresh}/>
      },
      {
        title: <Button shape="circle" color="primary" variant="link" icon={<PrinterOutlined/>}/>
      },
      {
        title: <Button shape="circle" color="primary" variant="link" icon={<FilePdfOutlined/>}/>
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