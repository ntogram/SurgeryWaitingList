import React,{useState} from 'react'
import {Button} from 'antd';
import {FilePdfOutlined,PrinterOutlined,FileExcelOutlined} from '@ant-design/icons'
import { useSelector} from 'react-redux';
// imports for exporting/printing pdf
import jsPDF from "jspdf";
import "jspdf-autotable";
import callAddFont from './pdfFont'
// imports for exporting excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
const Filehandler = ({columns,dataSource,op}) =>{
    const current = useSelector((state) => state.tab.selectedTab);
    const today = useSelector((state) => state.constants.today); // get title of current tab
    
    
    // select btn icon based on given operation op (Αποθήκευση ή Εκτύπωση)
    const retrieveBtnIcon =()=>{
      if (op==undefined){
          return null
      }
      else if (op=="Αποθήκευση PDF"){
        return <FilePdfOutlined/>
      }
      else if (op=="Αποθήκευση Excel"){
        return <FileExcelOutlined/>
      }
      else  
  
        {

          return <PrinterOutlined/>

      }



    }
    // Extract excel headers
    const getHeaders = ()=>{
      const headers = columns.map(col => col.title);
      return headers;
    }
    // Extract excel data
    const getRows = () =>{
      const rows = dataSource.map(record =>columns.map(col => record[col.key]));
      return rows
    }



    const createPdf = ()=>{
      //  form doc title
      const title = formDocTitle();
      // Extract table column headers and rows
      const columnNames = getHeaders();
      const tableRows = getRows();
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
    const downloadPdf = () =>{
      // retrieve pdf created by invoking createPdf  along with document file  
      const docfile = createPdf();
      // extract document title & file
      const title = docfile["title"];
      const doc =  docfile["doc"];
      // Form filename
      const extension="pdf";
      const filename = formFileName(title,extension);
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

   const  downloadExcel = () =>{
      //  form doc title
      const title = formDocTitle();
      // Extract table column headers and rows
      const columnNames = getHeaders();
      const tableRows = getRows();
      // Create a workbook and a worksheet
      const workbook = XLSX.utils.book_new();
      let worksheetData = [];
      worksheetData = worksheetData.concat([columnNames], tableRows);
      // create worksheet with worksheetData
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      // add the worksheet to workbook.  appended worksheet named as title
      XLSX.utils.book_append_sheet(workbook, worksheet, "Φύλλο1");
      // create excel
      const excelBuffer = XLSX.write(workbook, {bookType: "xlsx",type: "array"});
      // create file for excel 
      const file = new Blob([excelBuffer], { type: "application/octet-stream" });
      // Form filename
      const extension="xlsx";
      const filename = formFileName(title,extension);
      saveAs(file, filename);

   }




  
   const handleClick = () => {
    if (op === "Αποθήκευση PDF") {
      downloadPdf();
    }
    else if (op==="Αποθήκευση Excel"){
      downloadExcel();
    }
     else if (op === "Εκτύπωση") {
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


  // give string (title of file ) and the file extension (e.g. pdf,xlsx)
  const formFileName = (title,extension)=>{
    const filename = title +" "+today.format('YYYY-MM-DD')+"."+extension
    return filename;
  }




    return <Button shape="circle" color="primary" variant="link" icon={retrieveBtnIcon()} onClick={handleClick}/>


}

export default Filehandler;
