import React,{useState} from 'react'
import {Button} from 'antd';
import {FilePdfOutlined,PrinterOutlined} from '@ant-design/icons'
import { useSelector} from 'react-redux';
import jsPDF from "jspdf";
import "jspdf-autotable";
import callAddFont from './pdfFont'

const PDFhandler = ({columns,dataSource,op}) =>{
    const current = useSelector((state) => state.tab.selectedTab);
    const today = useSelector((state) => state.constants.today); // get title of current tab
    
    
    // select btn icon based on given operation op (Αποθήκευση ή Εκτύπωση)
    const retrieveBtnIcon =()=>{
      if (op==undefined){
          return null
      }
      else if (op=="Αποθήκευση"){
        return <FilePdfOutlined/>
      }
      else{

          return <PrinterOutlined/>

      }



    }
    const createPdf = ()=>{
      // 
      const title = formDocTitle();
      // Extract table column headers and rows
      const columnNames = columns.map((col) => col.title)
      const tableRows = dataSource.map( (record)=>columns.map((col) => record[col.key]));
      // create pdf file
      const doc = new jsPDF();
      // Call the font loading function with the correct context
      callAddFont.call(doc);
      // Set the custom font for your document
      doc.setFont("Times New Roman");
      // Add text or tables using the custom font
      doc.text(title, 10, 10);
      // Create a table in the PDF with the appropriate headers and rows
      doc.autoTable({
        head: [columnNames],
        body: tableRows,
        styles: {
          font: "Times New Roman",
          fontStyle: "normal",
        }
      
      });
      const docfile ={"doc":doc,"title":title}
      return docfile;
    }
    const download = () =>{
      // retrieve pdf created by invoking createPdf  along with document file  
      const docfile = createPdf();
      // extract document title & file
      const title = docfile["title"];
      const doc =  docfile["doc"];
      // Form filename
      const extension = ".pdf"
      const filename = title +" "+today.format('YYYY-MM-DD')+extension
      // save doc as filename
      doc.save(filename);
    }
  
   const print = () => {
    // retrieve pdf created by invoking createPdf  along with document file  
    const docfile = createPdf();
    // extract document file
    const doc =  docfile["doc"];
    // Call the print method of the jsPDF instance
    doc.autoPrint(); // Prepare for printing
    window.open(doc.output('bloburl'), '_blank'); // Open print dialog
   }

  
  
   const handleClick = () => {
    if (op === "Αποθήκευση") {
        download();
    } else if (op === "Εκτύπωση") {
        print();
    }
}
  
  
  
    const formDocTitle = () =>{
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
          return title;
  }  






    return <Button shape="circle" color="primary" variant="link" icon={retrieveBtnIcon()} onClick={handleClick}/>


}

export default PDFhandler;
