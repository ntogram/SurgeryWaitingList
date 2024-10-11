import React,{ useState,useEffect} from 'react';
import { useSelector } from 'react-redux'; 
import { Table } from 'antd';
import ButtonCollection from './utilities/ButtonCollection'
import { retrieveStatistics } from '../services/serviceAPI';

const StatisticsBySurgeryType  = () => {
    //style
    const { fullProperties, surgeries } = useSelector((state) => state.constants); 
    const surgeryTypes =  Array.from(new Set(Object.values(surgeries).flat())).sort();
    const [statistics,setStatistics]= useState([])
    // generate table headers
    const generateColumns = (properties) => {
        const columns = [
          {
            title: 'Επέμβαση', // Cell 0,0
            dataIndex: 'surgery',
            key: 'surgery',
            fixed: 'left', // First column fixed
            sorter: (value1, value2) => value1.surgery.localeCompare(value2.surgery),
            
            filters: surgeryTypes.concat("Όλες").map( surgeryType =>({text:surgeryType,value:surgeryType})),
            onFilter: (value, record) => value=="Όλες"?true: record.surgery.includes(value)
          },
          ...properties.map((property) => ({
            title: property,
            dataIndex: property,
            key: property,
            sorter: (value1,value2) => value1[property] - value2[property],
          })),
        ];
        return columns;
      };




    // generate data
    const generateDataSource =(surgeries,properties)=>{
        console.log(surgeries)
        let data =Object.fromEntries(
            surgeries.map(surgery => [
              surgery, 
              Object.fromEntries(properties.map(property => [property, Math.floor(Math.random()*30)]))
            ])
          );
          //console.log(data)
          return surgeries.map((surgery) => {
            const row = { surgery };
            properties.forEach((property) => {
              row[property] = data[surgery][property];
            });
            return row;
          });



    }

    useEffect(() => {

      const fetchStatistics = async () => {
        try {
          const data = await retrieveStatistics('surgery');  // Call the listPatients method
          setStatistics(data);  // Update state with the fetched data
          
        } catch (error) {
          console.error("Error fetching patients data:", error);
        }
      };
      
      if (statistics.length==0){
        fetchStatistics();

      }
      
      //console.log(patients)  
    }, [statistics]);





    const dataSource = generateDataSource(surgeryTypes,fullProperties);
    const columns = generateColumns(fullProperties)
      return(<div>
                <ButtonCollection/>
                <Table
                  columns={columns}
                  
                  dataSource={statistics}
                  bordered
                  pagination={{ pageSize: 12 }}
                  scroll={{ x: 'max-content' }} 
                />
        </div>
      );

}


export default StatisticsBySurgeryType;