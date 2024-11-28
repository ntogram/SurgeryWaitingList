import React,{useState} from 'react'
import { useSelector} from 'react-redux';
import {CheckOutlined} from '@ant-design/icons'
import {Button,DatePicker} from 'antd';


const GlobalDateSelector= ({ids,handleDateSurgeryChange,validateSurgeryDate})=>{
    const today = useSelector((state)=> state.constants.today)

    const handleMultiDateSurgeryChange = (date,dateString)=>{
        console.log("dt",ids)
        if (ids.length>0){
            ids.forEach((id) => handleDateSurgeryChange(date,dateString,id));
        }
    }

    const validateMultiSurgeryDate = async () => {
        if (ids.length > 0) {
            // Use for...of with async/await to ensure each call is properly awaited
            for (const id of ids) {
                await validateSurgeryDate(id); // Await the async function call
            }
        }
    };





    return <div>
    <span><DatePicker variant="filled" style={{maxWidth: '70%',width: '100%' }}  onChange={(date,dateString)=>handleMultiDateSurgeryChange(date,dateString)} 
    defaultValue={today} 
    maxDate={today.add(1, 'day')} /></span><Button 
     type="primary" 
     shape="circle"
     style={{ marginLeft: '5%',backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }} 
     onClick={() => validateMultiSurgeryDate()}
    
   >
     <CheckOutlined />
   </Button></div>





}

export default GlobalDateSelector;