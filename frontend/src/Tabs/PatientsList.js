import React,{ useState,useEffect} from 'react';
import { Table,Switch,Button,DatePicker} from 'antd';
import { CheckOutlined, EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux'; 
import dayjs from 'dayjs';
import getColumnSearchProps from '../Search/getColumnSearchProps '; 
import {listPatients,updateReferral,updateSurgeryDate} from '../services/serviceAPI'
import ButtonCollection from './utilities/ButtonCollection'











const PatientsList  = () => {
   //style
 


  //sort
  const [searchText, setSearchText] = useState('');
  const [patients, setPatients] = useState([]);
  
   const {today,surgeries} = useSelector((state) => state.constants); 
   const surgeryTypes =  (Array.from(new Set(Object.values(surgeries).flat())).sort());
   const booleanAnswers=["Ναι","Όχι","Όλες"]
   const fullProperties = ["Μόνιμος Στρατιωτικός", "Έφεδρος Στρατιωτικός", "Αστυνομικός", "Απόστρατος", "Μέλος", "Ιδιώτης"]
   
  // generate table headers
    const generateColumns = () => {
        const columns = [
          {
            title: 'Α/Α', 
            dataIndex: 'id',
            key: 'id',
            fixed: 'left', 
            sorter: (value1,value2) => value1['id'] - value2['id']
          },
          {
            title: 'Ονοματεπώνυμο Ασθενούς', 
            dataIndex: 'patientName',
            key: 'patientName',
            fixed: 'left',
            sorter: (value1, value2) => value1['patientName'].localeCompare(value2['patientName']),
            ...getColumnSearchProps('patientName', searchText, setSearchText)
          
          },
          {
            title: 'Ιδιότητα', 
            dataIndex: 'property',
            key: 'property',
            fixed: 'left', 
            sorter: (value1, value2) => value1['property'].localeCompare(value2['property']),
            filters: (fullProperties.concat("Όλοι")).map( fullProperty =>({text:fullProperty,value:fullProperty})),
            onFilter: (value, record) => value=="Όλοι"?true:record.property.includes(value)
          },
          {
            title: 'Πάθηση', 
            dataIndex: 'disease',
            key: 'disease',
            fixed: 'left', 
            sorter: (value1, value2) => value1['disease'].localeCompare(value2['disease']),
            filters: (surgeryTypes.concat("Όλες")).map( surgeryType =>({text:surgeryType,value:surgeryType})),
            onFilter: (value, record) => value=="Όλες"?true:record.disease.includes(value)
          },
          {
            title: 'Χειρουργήθηκε στις', 
            dataIndex: 'surgeryDate',
            key: 'surgeryDate',
            fixed: 'left', 
            render: (text, record) => 
             <div>
              {disableSurgeryDatePicker(record)? '-':
              
              
              
              
              !record.surgeryDone?
             <div>
             <span><DatePicker variant="filled" style={{maxWidth: '60%',width: '100%' }}  onChange={(date,dateString,id)=>handleDateSurgeryChange(date,dateString,record.id)} defaultValue={today} maxDate={today} /></span><Button 
              type="primary" 
              shape="circle"
              style={{ marginLeft: '5%',backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }} 
              onClick={() => validateSurgeryDate(record.id)}
             
            >
              <CheckOutlined />
            </Button></div>
            :<div><span>{record.surgeryDate}</span><Button 
            type="primary" 
            shape="circle"
            style={{ marginLeft: '35%' }} 
            onClick={() => validateSurgeryDate(record.id,false)}
            
          >
           <EditOutlined />
          </Button></div>}</div>
            
          },
          {
            title: 'Παραμένει στη λίστα', 
            dataIndex: 'active',
            key: 'active',
            fixed: 'left', 
            render: (text, record) => (
              <div>{isActive(record)}</div>),
            
            sorter: (a, b) => {
                    const value1 = isActive(a) === 'Ναι' ? 1 : 0; // Use isActive() for sorting
                    const value2 = isActive(b) === 'Ναι' ? 1 : 0;
                    return value1 - value2; // Sort 'Ναι' (1) before 'Όχι' (0)
            },
            filters: booleanAnswers.map( booleanAnswer =>({text:booleanAnswer,value:booleanAnswer})),
            onFilter: (value, record) => {
                if (value=="Όλες"){
                  return true;}
                console.log("value:",value)
                console.log("active fun:",isActive(record))
                console.log("active:",record.active)
                console.log("con",record.active== value)
                return isActive(record)== value

            } 




              
          },
          {
            title: 'Απολύθηκε', 
            dataIndex: 'dischargeStatus',
            key: 'dischargeStatus',
            fixed: 'left', 
            sorter: (value1, value2) => value1['dischargeStatus'].localeCompare(value2['dischargeStatus']),
            filters: booleanAnswers.concat(["-"]).map( booleanAnswer =>({text:booleanAnswer,value:booleanAnswer})),
            onFilter: (value, record) =>  value=='Όλες'?true:record.dischargeStatus.includes(value)
          },
          {
            title: 'Παραπέμφθηκε σε άλλο νοσοκομείο', 
            dataIndex: 'referral',
            key: 'referral',
            fixed: 'left', 
            render: (text, record) => (
              <div>
                { disableReferral(record)?"Όχι":
                
                
                
                
                !record.referralSubmitted ? (
                  <div>
                    <Switch style={{backgroundColor: record.referral === 'Ναι' ? '#28a745' : '#ff4d4f'}}
                      checked={record.referral === 'Ναι'} 
                      onChange={() => handleReferralChange(record.id)}
                      
                      checkedChildren="Ναι" 
                      unCheckedChildren="Όχι" 
                    />
                    {/* Add space and then the Submit button */}
                    <Button 
                      type="primary" 
                      shape="circle"
                      style={{ marginLeft: '5%',backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }} 
                      onClick={() => validateReferral(record.id)}
                    
                    >
                      <CheckOutlined />
                    </Button>
                  </div>
                ) : (
                  <div>{record.referral}<Button 
                  type="primary" 
                  shape="circle"
                  style={{ marginLeft: '15%' }} 
                  onClick={() => validateReferral(record.id,false)}
                
                >
                  <EditOutlined />
                </Button></div> // Show referral status after submission
                )}
              </div>
            )
          }
        ];
        return columns;
      };
      // Helper function to generate random names
      const generateRandomName = () => {
        const firstNames = ['Γιάννης', 'Μαρία', 'Γιώργος', 'Σοφία', 'Δημήτρης', 'Αλεξάνδρα', 'Νίκος', 'Ελένη'];
        const lastNames = ['Παπαδόπουλος', 'Παπακώστα', 'Καραμανλής', 'Σαμαράς', 'Κωστόπουλος', 'Μαυρίδης'];
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${firstName} ${lastName}`;
      };

// Helper function to generate random surgery date
const generateRandomDate = () => {
  const randomDaysAgo = Math.floor(Math.random() * 365); // random number of days in the last year
  return dayjs().subtract(randomDaysAgo, 'day').format('YYYY-MM-DD');
};

// Helper function to generate random boolean value
const generateRandomBoolean = () => Math.random() > 0.5;

// Helper function to generate random disease
const generateRandomDisease = () => {
    const diseases = surgeryTypes;
    return diseases[Math.floor(Math.random() * diseases.length)];
  };

// Helper function to generate random properties (role)
const generateRandomProperty = () => {
  return fullProperties[Math.floor(Math.random() * fullProperties.length)];
};


  // Μέθοδος που ελέγχει αν ένας έφεδρος στρατιωτικός έχει απολυθεί
  const isDischarged = (record) =>{
    if (record.property =="Έφεδρος Στρατιωτικός" &&  record.dischargeStatus=="Ναι"){
      return true;
    }
    return false
  }

// Μέθοδος που ελέγχει αν ο ασθενής έχει παραπεφθεί σε άλλο νοσοκομείο
  const isRefferalDecided = (record) =>{
    if (record.referralSubmitted==true && record.referral=="Ναι"){
      return true;
    }
    return false
  }

  const isSurgeryDateDefined = (record) =>{
    if ( record.surgeryDone == true && record.surgeryDate!=null){
      return true;
    }
  }




  // check if  surgery date picker needs to be disabled
  const disableSurgeryDatePicker = (record)=>{
      // Έφεδρος Στρατιωτικός που έχει απολυθει
      if (isDischarged(record)){
        return true;
      }
      // Έχει γίνει παραπομπή σε άλλο νοσοκομείο
      if (isRefferalDecided(record)){
        return true;
      }
      // λοιπές περιπτώσεις
      return false;
  }

  const disableReferral =( record) =>{
      if (isDischarged(record)){
          return true;
        }
      if (isSurgeryDateDefined(record)){
        return true;
      }
      //λοιπές περιπτώσεις
      return false;


  }
  // Έλεγχος αν ο ασθενής είναι στη λίστα
  const isActive = (record) =>{
    if (isDischarged(record)){
      return 'Όχι'; //έχει απολυθεί
      }
    if (isRefferalDecided(record)){
      return 'Όχι'; // έχει αποφασιστεί παραπομπή του
    }
    if (isSurgeryDateDefined(record)){
      return 'Όχι'; // έχει οριστεί ημερομηνία εγχείρισης
    }
    return 'Ναι'

  }



  // Generate dummy data for the table
  const generateDataSource = (count = 20) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
      let propVal = generateRandomProperty();
      let dischargeStatusVal = false
      /*let referralSubmitVal = generateRandomBoolean();
      let surgeryDoneVal = generateRandomBoolean();
      let referralVal = null;
      if (referralSubmitVal==true){
        referralVal = generateRandomBoolean() ? 'Ναι' : 'Όχι'
        surgeryDoneVal = false
      }
      


      if (propVal=="Έφεδρος Στρατιωτικός"){
        dischargeStatusVal = generateRandomBoolean();
      }*/





      data.push({
        id: i,
        patientName: generateRandomName(),
        property: propVal,
        disease: generateRandomDisease(),
        surgeryDate: null,
        active:dischargeStatusVal?"Όχι":(generateRandomBoolean() ? 'Ναι' : 'Όχι'),
        dischargeStatus: (propVal=="Έφεδρος Στρατιωτικός")? (generateRandomBoolean() ? 'Ναι' : 'Όχι'):"-",
        referral: null,
        referralSubmitted: false,
        surgeryDone:false

      });
    }
    return data;
  };

  // set  the approrpiate answer according to the referral toggle button option
  const handleReferralChange = (id) => {
    const updatedPatients = patients.map(patient => {
      if (patient.id === id) {
        return {
          ...patient,
          referral: patient.referral === 'Ναι' ? 'Όχι' : 'Ναι'
        };
      }
      return patient;
    });
    setPatients(updatedPatients); 
  };

// submit the selected referral answer
const validateReferral = async (surgeryId,status=true) => {

  const updatedPatients = patients.map(patient => {
    if (patient.id === surgeryId) {
      return {
        ...patient,
        referralSubmitted: status, // Set the submitted status to true
        referral:patient.referral!==null?patient.referral:'Όχι'
      };
    }
    return patient;
  });
  setPatients(updatedPatients); // Update state with submission
  if (status==true){
    let selectedPatient = patients.find(({ id }) => id == surgeryId);
    const referral = selectedPatient.referral=='Ναι'?1:0;
    const response = await updateReferral(selectedPatient.id,referral)
  }
  
};


// set the selected  surgery date
const handleDateSurgeryChange = (date,dateString,id) =>{
 
  
     const updatedPatients = patients.map(patient => {
     if (patient.id === id) {
       return {
         ...patient,
         surgeryDate:dateString
     }
    }
     return patient;
   });
   setPatients(updatedPatients); 
  }



const validateSurgeryDate = async (surgeryId,status=true) => {
    const updatedPatients = patients.map(patient => {
    if (patient.id === surgeryId) {
      return {
        ...patient,
        surgeryDone: status,
        surgeryDate:patient.surgeryDate!==null? patient.surgeryDate:today.format("YYYY-MM-DD"),// if no surgerydate selected,submit today date
        active: 'Όχι',// βγαίνει από τη λίστα αναμονής
         // Set the submitted status to true
      };
    }
    return patient;
  });
  setPatients(updatedPatients); // Update state with submission
  if (status==true){
    console.log(surgeryId)
    let selectedPatient = patients.find(({ id }) => id == surgeryId);
    console.log(selectedPatient)
    let surgeryDate =selectedPatient.surgeryDate;
   // const referral = selectedPatient.referral=='Ναι'?1:0;
    const response = await updateSurgeryDate(selectedPatient.id,surgeryDate)
  }
  else{
    const response = await updateSurgeryDate(surgeryId,null)
  }




};




    // generate data
    useEffect(() => {

      const fetchPatients = async () => {
        try {
          const data = await listPatients();  // Call the listPatients method
          setPatients(data);  // Update state with the fetched data
          console.log(data)
        } catch (error) {
          console.error("Error fetching patients data:", error);
        }
      };
      
      if (patients.length==0){
        fetchPatients();

      }
      
      //console.log(patients)  
    }, [patients]);


    const columns = generateColumns()
   
    return (
      <div>
       
          <ButtonCollection/>
          <Table
          columns={columns}
          pagination={false}
          dataSource={patients}
          bordered
          scroll={{ x: 'max-content' }} 
        />
      </div>
      
      );

}


export default PatientsList;