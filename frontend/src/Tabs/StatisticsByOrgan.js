import React,{ useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {resetRefreshTab} from '../redux/reducers/tabSlice';
import { Table } from 'antd';
import ButtonCollection from './utilities/ButtonCollection'
import { retrieveStatistics } from '../services/serviceAPI';


const StatisticsByOrgan  = () => {
   //style
    const { fullProperties, surgeries } = useSelector((state) => state.constants); 
    const organs =  Object.keys(surgeries)
  // state variable for storing table data
  const [statistics,setStatistics]= useState([])
  const refreshTab = useSelector((state) => state.tab.refreshTab);
  const dispatch = useDispatch();



    // generate table headers
    const generateColumns = (properties) => {
        const columns = [
          {
            title: 'Ανατομικές περιοχές', // Cell 0,0
            dataIndex: 'organ',
            key: 'organ',
            fixed: 'left',
            sorter: (value1, value2) => value1.organ.localeCompare(value2.organ),
            filters: organs.concat("Όλες").map( organ =>({text:organ,value:organ})),
            onFilter: (value, record) => value=="Όλες"? true: record.organ.includes(value)
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
        let data =Object.fromEntries(
            organs.map(organ => [
              organ, 
              Object.fromEntries(properties.map(property => [property, Math.floor(Math.random()*30)]))
            ])
          );
          //console.log(data)
          return organs.map((organ) => {
            const row = { organ };
            properties.forEach((property) => {
              row[property] = data[organ][property];
            });
            return row;
          });



    }

    useEffect(() => {

      const fetchStatistics = async () => {
        try {
          const data = await retrieveStatistics('organ');  // Call the listPatients method
          setStatistics(data);  // Update state with the fetched data
          console.log(data)
        } catch (error) {
          console.error("Error fetching patients data:", error);
        }
      };
      
      if (statistics.length==0){
        fetchStatistics();

      }
      if (refreshTab=="statisticsByOrgan"){
        console.log("redux refreshTab:"+refreshTab)
        fetchStatistics();
        dispatch(resetRefreshTab());
      }
      //console.log(patients)  
    }, [statistics,refreshTab]);









    const dataSource = generateDataSource(organs,fullProperties);
    const columns = generateColumns(fullProperties)
    return (
       <div>
       
      <ButtonCollection dataSource={statistics} columns={columns}/>
        <Table
          columns={columns}
          pagination={false}
          dataSource={statistics}
          bordered
          scroll={{ x: 'max-content' }} 
        />
        </div>
      );

}


export default StatisticsByOrgan;