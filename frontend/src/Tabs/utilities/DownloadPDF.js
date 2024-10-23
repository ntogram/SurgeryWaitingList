import React,{useState} from 'react'
import {Button} from 'antd';
import {FilePdfOutlined} from '@ant-design/icons'
import { useSelector} from 'react-redux';
import jsPDF from "jspdf";
import "jspdf-autotable";
import {timesNewRomanBase64} from './pdfFont'

const DownloadPDF = ({columns,dataSource}) =>{
    const current = useSelector((state) => state.tab.selectedTab);
    const today = useSelector((state) => state.constants.today); // get title of current tab
    const download = () =>{
        // create pdf file
        const doc = new jsPDF();
        // create table and add content in  pdf
        doc.autoTable({
          head: [columns],
          body: dataSource,
        });
        // form document file
        console.log(columns)
        console.log(dataSource)
        const title = formDocTitle();
        console.log(doc)
        
        doc.save(title)

        



    }
  const formDocTitle = () =>{
    const extension = ".pdf"
    let title ="";
    switch(current){
      case "patientsList":
        title =  "Λίστα Ασθενών";
        break;
      case "statisticsByOrgan":
        title ="Στατιστικά ανά  ανατομική περιοχη";
      case "statisticsBySurgeryType":    
        title = "Στατιστικά ανά τύπο επέμβασης";
    }
    title =title +" "+today.format('YYYY-MM-DD')+extension



    return title;
  }  



    return <Button shape="circle" color="primary" variant="link" icon={<FilePdfOutlined/>} onClick={download}/>


}

export default DownloadPDF;
