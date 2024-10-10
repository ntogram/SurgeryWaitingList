import React,{ useState } from 'react';
import { useSelector } from 'react-redux'; 
import { Table } from 'antd';
import ButtonCollection from './utilities/ButtonCollection'


const StatisticsByOrgan  = () => {
   //style
    const { fullProperties, surgeries } = useSelector((state) => state.constants); 
    const organs =  Object.keys(surgeries)
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
          console.log(data)
          return organs.map((organ) => {
            const row = { organ };
            properties.forEach((property) => {
              row[property] = data[organ][property];
            });
            return row;
          });



    }
    const dataSource = generateDataSource(organs,fullProperties);
    const columns = generateColumns(fullProperties)
    return (
       <div>
       
      <ButtonCollection/>
        <Table
          columns={columns}
          pagination={false}
          dataSource={dataSource}
          bordered
          scroll={{ x: 'max-content' }} 
        />
        </div>
      );

}


export default StatisticsByOrgan;