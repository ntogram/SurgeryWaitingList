import React,{useState} from 'react'
import {Button,Tooltip } from 'antd';
import {FilePdfOutlined,PrinterOutlined,FileExcelOutlined} from '@ant-design/icons'
import { useSelector} from 'react-redux';
// imports for exporting/printing pdf
import jsPDF from "jspdf";
import "jspdf-autotable";
import callAddFont from './pdfFont'
// imports for exporting excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { matchScreen } from 'antd/es/_util/responsiveObserver';
const Filehandler = ({columns,dataSource,op}) =>{
    const current = useSelector((state) => state.tab.selectedTab);
    const subtitles = useSelector((state) =>state.constants.dataTypes)
    const subtableTitles =useSelector((state) => state.constants.fullProperties)
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
      console.log(columns)
      const headers = columns.map(col => col.title);
      return headers;
    }
    // Extract excel data
    const getRows = () =>{
      let rows =  null;
    
      if (current == "patientsList"){
        rows = {};
        let resultList = [];
        let recordColumns =null
        
        
        console.log(dataSource)
        console.log(columns.length);
        Object.keys(dataSource).forEach(key => {
          const selectedSource = dataSource[key]; // Get the array for the key
          subtableTitles.forEach( (subtableTitle)=> {
            let mainTitle = new Array(columns.length).fill("");
            mainTitle[0] =subtableTitle
            const subselectedSource = selectedSource[subtableTitle] ?? []; // Get the array for the key
           console.log(key)
            console.log(selectedSource)
            console.log(mainTitle)
            console.log(subselectedSource)
            //console.log(columns)
            const nestedRecords = subselectedSource.map(record => columns.map(col => record[col.key] ?? "-"));
            resultList.push({"header":mainTitle,"records":nestedRecords});
          
      })
      rows[key] = resultList
      resultList =[]







        console.log(rows)
      })
    }
      else if (current=="statisticsByOrgan" || current=="statisticsBySurgeryType"){
        rows = {};
        Object.keys(dataSource).forEach(key => {
          const selectedSource = dataSource[key]; // Get the array for the key
    
          rows[key] = selectedSource.map(record => columns.map(col => record[col.key]));
          
      })
      }

      return rows;
      }



     



    const createPdf = ()=>{
      // main title
      const title = formDocTitle();
      // table titles
      const tableHeaders = subtitles;
      // Extract table column headers and rows
      const columnNames = getHeaders();
      const tableRows = getRows();
      let ypos=20;
      const doc = new jsPDF();
      callAddFont.call(doc);
      doc.setFontSize(16);
      // Add text or tables using the custom font
      doc.text(title, 10, 10);
      console.log(tableHeaders)
      for (const tableHeader of tableHeaders) {
        doc.setFontSize(14);
        doc.text(tableHeader, 10, ypos);
        if (current=="statisticsByOrgan" || current=="statisticsBySurgeryType"){
                doc.autoTable({
                  head: [columnNames],
                  body: tableRows[tableHeader],
                  startY: ypos+10,
                  styles: {
                    font: "Times New Roman",
                    fontStyle: "normal",
                  }
                
                });
               
              }
        else {
          tableRows[tableHeader].forEach( ({header,records})=> {
            doc.autoTable({
              startY: ypos+20,
              head: [header], // Property name
              styles: {
                font: "Times New Roman",
                fontStyle: "normal",
                halign: "center", // Center align the property name
                fillColor: [240, 240, 240], // Light grey background
                textColor: [0, 0, 0], // Black text
              },
            });
            doc.autoTable({
              startY: doc.lastAutoTable.finalY, // Start after the property name
              head: [columns], // Columns header
              body: records, // Table rows
              styles: {
                font: "Times New Roman",
                fontStyle: "normal",
              },
            });
            



            ypos= ypos +doc.lastAutoTable.finalY + 20;




          })
          
     




        }


        
        ypos = 20;
        if (tableHeader !="Επόμενο Τρίμηνο"){
          doc.addPage();
        }
      }
        const docfile ={"doc":doc,"title":title}
        return docfile;
    }




/*
      //  form doc title
      //const title = formDocTitle();
      const tableTitles= formDocSubtitles();
      // Extract table column headers and rows
      const columnNames = getHeaders();
      const tableRows = getRows();
      // create pdf file
      const doc = new jsPDF();
      // Call the font loading function with the correct context
      callAddFont.call(doc);
      // Set the custom font for your document
      doc.setFont("Times New Roman");
      doc.setFontSize(16);
      // Add text or tables using the custom font
      doc.text(title, 10, 10);

      // pdf when PatienList tab is selected
      if (current == "patientsList"){
            // Create a table in the PDF with the appropriate headers and rows
            doc.autoTable({
              head: [columnNames],
              body: tableRows,
              styles: {
                font: "Times New Roman",
                fontStyle: "normal",
              }
            
            });
    }
    else if (current=="statisticsByOrgan" || current=="statisticsBySurgeryType"){

      let ypos=20;
      // for each table
      // Create a table in the PDF with the appropriate headers and rows
      for (const tableTitle of tableTitles) {
        doc.setFontSize(14);
        doc.text(tableTitle, 10, ypos);
        
        doc.autoTable({
          head: [columnNames],
          body: tableRows[tableTitle],
          startY: ypos+10,
          styles: {
            font: "Times New Roman",
            fontStyle: "normal",
          }
        
        });
        ypos = 20;
        if (tableTitle!="Εκκρεμείς"){
          doc.addPage();
        }

      }


    }

      //const docfile ={"doc":doc,"title":title}
      return docfile;
    //}*/
    const downloadPdf = () =>{
      // retrieve pdf created by invoking createPdf  along with document file  
      const docfile = createPdf();
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
      // assign sheet names
      const sheetNames= subtitles;


      // Extract table column headers and rows
      const columnNames = getHeaders();
      const tableRows = getRows();
      // Create a workbook and a worksheet
      const workbook = XLSX.utils.book_new();
      let worksheetData = null;
      let worksheet = null;
      let currentRow = null;
      if (current == "patientsList"){
         // Define an array to store column widths
        let columnWidths = Array(columnNames.length).fill({ wch: 20 }); 
        
        for (const sheetName of sheetNames) {
          currentRow = 0;
          worksheetData = tableRows[sheetName]
          worksheet = {};
          // loop workheetdata
          worksheetData.forEach((value) => { 
            // add title
            const cellAddress = XLSX.utils.encode_cell({ r: currentRow, c: 0 }); // Vertical: r = index, c = 0
            worksheet[cellAddress] = { t: "s", v: value["header"][0],
              
              
              
             };
            //add table headers
            columnNames.forEach((columnName,index) => {
              const cellAddress = XLSX.utils.encode_cell({ r: currentRow+1, c: index }); // Row 2, Column
              worksheet[cellAddress] = { t: "s", v: columnName};
             // Set a larger width for table headers
             columnWidths[index] = { wch: Math.max(20, columnName.length + 5) };
            });
            //  add row data
            value["records"].forEach((patientData, patientIndex) => {
              patientData.forEach((patientValue, dataIndex) => {
                const cellAddress = XLSX.utils.encode_cell({ r: currentRow+patientIndex + 2, c: dataIndex }); // Start from row 3
                worksheet[cellAddress] = { t:   typeof value === "number" ? "n" : "s", v: patientValue  };
                 // Adjust column width based on the longest content in each column
                 columnWidths[dataIndex] = {wch: Math.max(columnWidths[dataIndex].wch, String(patientValue).length + 5)};
              });
              


            });
            // Increment the row to position the next table below the current one
            currentRow += 2 + value["records"].length; // Header + column names + data rows

            // Dynamically calculate the range for !ref for this table
            const lastColumn = XLSX.utils.encode_col(columnNames.length - 1);
            worksheet["!ref"] = `A1:${lastColumn}${currentRow}`;
            
            



          })
           // Set column widths in the worksheet
          worksheet["!cols"] = columnWidths;
          // Add the worksheet to the workbook with the current sheetName
          XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        }
      }
      else if (current=="statisticsByOrgan" || current=="statisticsBySurgeryType"){
          for (const sheetName of sheetNames) {
            worksheetData = []
            // for each table, create a worksheet
            worksheetData = worksheetData.concat([columnNames], tableRows[sheetName]);
            worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
            // Set Column Widths**
            worksheet["!cols"] = columnNames.map((col) => ({ wch: col.length + 20 }));
            // add the worksheet for each tanle to workbook.  appended worksheet named as  the value of corresponding sheet name
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
          }
      }
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

  const formDocSubtitles = () =>{
    if (current=="patientsList"){ 
      return null;
    }
    return subtitles;
  }





  // give string (title of file ) and the file extension (e.g. pdf,xlsx)
  const formFileName = (title,extension)=>{
    const filename = title +" "+today.format('YYYY-MM-DD')+"."+extension
    return filename;
  }




    return  <Tooltip placement="bottom" arrow={false} title={op}><Button shape="circle" color="primary" variant="link" icon={retrieveBtnIcon()} onClick={handleClick}/></Tooltip>


}

export default Filehandler;
