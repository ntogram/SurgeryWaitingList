import React,{useState} from 'react'
import {Button} from 'antd';
import {FilePdfOutlined} from '@ant-design/icons'
import { useSelector} from 'react-redux';
import jsPDF from "jspdf";
import "jspdf-autotable";
import callAddFont from './pdfFont'

const DownloadPDF = ({columns,dataSource}) =>{
    const current = useSelector((state) => state.tab.selectedTab);
    const today = useSelector((state) => state.constants.today); // get title of current tab
    const download = () =>{
        // form document name
        const title = formDocTitle();
        // Extract table column headers and rows
        const columnNames = columns.map((col) => col.title)
        //console.log(columns)
        //console.log(dataSource)
        const tableRows = dataSource.map( (record)=>columns.map((col) => record[col.key]));
        //console.log(columnNames)
        //console.log(tableRows)
        // create pdf file
        const doc = new jsPDF();
        // Call the font loading function with the correct context
        callAddFont.call(doc);
        // Set the custom font for your document
        doc.setFont("Times New Roman");
        // Add text or tables using the custom font
        doc.text("Δοκιμαστική εκτύπωση", 10, 10);
        // Create a table in the PDF with the appropriate headers and rows
        doc.autoTable({
          head: [columnNames],
          body: tableRows,
          styles: {
            font: "Times New Roman",
            fontStyle: "normal",
          }
        
        });
       // store pdf
       doc.save(title)
     // Save the PDF with the custom font applied
    // doc.save("table.pdf");



        
        /*
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
        */
        



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
        break;
      case "statisticsBySurgeryType":    
        title = "Στατιστικά ανά τύπο επέμβασης";
        break;
    }
    title =title +" "+today.format('YYYY-MM-DD')+extension



    return title;
  }  



    return <Button shape="circle" color="primary" variant="link" icon={<FilePdfOutlined/>} onClick={download}/>


}

export default DownloadPDF;
