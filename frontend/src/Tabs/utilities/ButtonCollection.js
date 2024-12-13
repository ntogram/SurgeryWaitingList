import React,{useState,useEffect} from 'react'
import { Breadcrumb,Space,Select} from 'antd';
import RefreshButton from './RefreshButton';
import Filehandler from './Filehandler';
import { useSelector} from 'react-redux';
import GlobalDateSelector from './GlobalDateSelector';
// put buttons in separate components
const ButtonCollection = ({columns,dataSource,ids,handleDateSurgeryChange,validateSurgeryDate,selectedStatisticType,changeStatisticType,statisticTypes}) =>{
    const [refreshDateTime, setRefreshDateTime] = useState(new Date());
    const current = useSelector((state) => state.tab.selectedTab);
    
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
                    };
   
                    


     let toolboxItems =[
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
        title: refreshDateTime.toLocaleString('el-GR', options),
        
         
      }];
      
      if (current=="patientsList"){
        toolboxItems.splice(4, 0, {title:<GlobalDateSelector ids={ids} handleDateSurgeryChange={handleDateSurgeryChange} validateSurgeryDate={validateSurgeryDate}/>});
      }
      else
      {
        const options = statisticTypes.map(statisticType => ({ 
          value: statisticType, 
          label: statisticType 
        }));




        toolboxItems.splice(4,0,{title:<Select
          defaultValue={statisticTypes[0]}
          onChange={changeStatisticType}
          options={options}
          dropdownStyle={{ width: 300 }} 





        />},{title:<div>{selectedStatisticType}</div>})
      }



      useEffect(() => {
          console.log("ids:",ids)

      },[ids])



      return ( <Breadcrumb
        items={toolboxItems}
        separator=<Space/>
        style={{color: 'rgba(0, 0, 0, 0.88)'}}
      />)
  
  
  
  
  }

  export default ButtonCollection;