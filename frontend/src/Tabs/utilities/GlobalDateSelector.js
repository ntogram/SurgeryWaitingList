import React,{useState} from 'react'
import { useSelector} from 'react-redux';
import {CheckOutlined} from '@ant-design/icons'
import {Button,DatePicker,Tooltip} from 'antd';


const GlobalDateSelector= ({dataSource,selectedRecords,handleDateSurgeryChange,validateSurgeryDate,setLoading})=>{
    const today = useSelector((state)=> state.constants.today)
  
    const handleMultiDateSurgeryChange = (date,dateString)=>{
        Object.entries(selectedRecords).forEach(([propertyVal, recordIds]) => {
            if (recordIds.length > 0) {
              // Process each ID within the current property
              recordIds.forEach( (recordId) => handleDateSurgeryChange(date,dateString,recordId,propertyVal));
            }
        });
    }

    const validateMultiSurgeryDate = async () => {
        console.log("test:",selectedRecords)
        setLoading(true);
        // Iterate over each property and its associated IDs
        for (const [propertyVal, recordIds] of Object.entries(selectedRecords)) {
                    if (recordIds.length > 0) {
                    // Process each ID within the current property
                    for (const recordId of recordIds) {
                            await validateSurgeryDate(recordId, propertyVal); // Await the async function call
                                                }
                                                    }
        }
        setLoading(false);
    };





    return <div>
    <span><DatePicker variant="filled" style={{maxWidth: '70%',width: '100%' }}  onChange={(date,dateString)=>handleMultiDateSurgeryChange(date,dateString)} 
    defaultValue={today}  disabled={!dataSource || Object.keys(dataSource).length === 0}
     /></span> <Tooltip placement="bottom" arrow={false} title={"Επικύρωση"}><Button 
     type="primary" 
     shape="circle"
     style={{ marginLeft: '5%',backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }} 
     onClick={() => validateMultiSurgeryDate()}  disabled={!dataSource || Object.keys(dataSource).length === 0}
    
   >
     <CheckOutlined />
   </Button></Tooltip></div>





}

export default GlobalDateSelector;