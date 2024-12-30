import React,{ useState,useEffect} from 'react';
import { Table,Switch,Button,DatePicker,Tooltip,notification} from 'antd';
import { CheckOutlined, EditOutlined,DeleteOutlined,QuestionCircleFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {resetRefreshTab} from '../redux/reducers/tabSlice';
import dayjs from 'dayjs';

import getColumnSearchProps from '../Search/getColumnSearchProps '; 
import {listPatients,updateReferral,updateSurgeryDate} from '../services/serviceAPI'
import ButtonCollection from './utilities/ButtonCollection'
 










const PatientsList  = () => {
   const [api, contextHolder] = notification.useNotification(); 
  const [searchText, setSearchText] = useState('');
  const [patients, setPatients] = useState([]);
   const {today,surgeries} = useSelector((state) => state.constants); 
   const surgeryTypes =  (Array.from(new Set(Object.values(surgeries).flat())).sort());
   const booleanAnswers=["Ναι","Όχι","Όλες"]
   const fullProperties = ["Μόνιμος Στρατιωτικός", "Έφεδρος Στρατιωτικός", "Αστυνομικός", "Απόστρατος", "Μέλος", "Ιδιώτης"]
   // get name of refresh tab
   const refreshTab = useSelector((state) => state.tab.refreshTab);
   const dispatch = useDispatch();
   




   const [selectedSurgeries, setSelectedSurgeries] = useState([]);

  const getRowClassName = (record) => {
    return selectedSurgeries.includes(record.id) ? '.ant-table-row.selected-row' : '';
  };

  const rowSelection = {
    selectedRowKeys: selectedSurgeries,
    onChange: (newSelectedRowKeys) => {
      console.log('Selected row keys:', newSelectedRowKeys);
      setSelectedSurgeries(newSelectedRowKeys);



    },
    getCheckboxProps: (record) => ({
      disabled: (record.referral === 'Ναι' || record.dischargeStatus=='Ναι')

    })
  };

   
  // generate table headers
    const generateColumns = () => {
        const columns = [
          {
            title: 'Διαγραφή',
            key: 'delete',
            align: 'center',
            render: (text, record) => (
              <Button type="primary" htmlType="submit" danger  icon={<DeleteOutlined />}  onClick={() => deleteRecord(record.id)}>
              </Button>
            ),
          },{
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
            title: 'Ημερομηνία Εξέτασης', 
            dataIndex: 'examDate',
            key: 'examDate',
            fixed: 'left', 
            sorter: (value1,value2)=>new Date(value1.examDate) - new Date(value2.examDate)
          },
          {
            title: 'Πάθηση', 
            dataIndex: 'disease',
            key: 'disease',
            fixed: 'left', 
            sorter: (value1, value2) => value1['disease'].localeCompare(value2['disease']),
           
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
             <span><DatePicker variant="filled" style={{maxWidth: '60%',width: '100%' }}  onChange={(date,dateString,id)=>handleDateSurgeryChange(date,dateString,record.id)} 
             defaultValue={record.surgeryDate!=null?dayjs(record.surgeryDate):null} minDate={dayjs(record.examDate)}
             maxDate={today} /></span>
             
             <Tooltip placement="bottom" arrow={false} title={"Επικύρωση"}>
             <Button 
              type="primary" 
              shape="circle"
              style={{ marginLeft: '5%',backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }} 
              onClick={() => validateSurgeryDate(record.id)}
             
            >
              <CheckOutlined />
            </Button>
            </Tooltip>
            </div>
            :<div><span>{record.surgeryDate}</span>
            <Tooltip placement="bottom" arrow={false} title={"Επεξεργασία"}>
            <Button 
            type="primary" 
            shape="circle"
            style={{ marginLeft: '35%' }} 
            onClick={() => validateSurgeryDate(record.id,false)}
            
          >
           <EditOutlined />
          </Button>
          </Tooltip>
          
          </div>}</div>
            
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
                    <Tooltip placement="bottom" arrow={false} title={"Επικύρωση"}>
                    <Button 
                      type="primary" 
                      shape="circle"
                      style={{ marginLeft: '5%',backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }} 
                      onClick={() => validateReferral(record.id)}
                    
                    >
                      <CheckOutlined />
                    </Button>
                    </Tooltip>
                  </div>
                ) : (
                  <div>{record.referral}
                  

                  <Tooltip placement="bottom" arrow={false} title={"Επεξεργασία"}>
                  <Button 
                  type="primary" 
                  shape="circle"
                  style={{ marginLeft: '15%' }} 
                  onClick={() => validateReferral(record.id,false)}
                
                >
                  <EditOutlined />
                </Button>
                </Tooltip>
                
                </div> // Show referral status after submission
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
      
    if(dateString==null){
      dateString = today.format('YYYY-MM-DD');
    }
    setPatients((prevPatients) => {
      const updatedPatients = prevPatients.map((patient) => {
          if (patient.id === id) {
              return {
                  ...patient,
                  surgeryDate: dateString,
              };
          }
          return patient;
      });
      return updatedPatients;
  });
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
    let selectedPatient = patients.find(({ id }) => id == surgeryId);
    let surgeryDate =selectedPatient.surgeryDate;
   // const referral = selectedPatient.referral=='Ναι'?1:0;
    const response = await updateSurgeryDate(selectedPatient.id,surgeryDate)
  }
 /* else{
    const response = await updateSurgeryDate(surgeryId,null)
  }*/




};

  const deleteRecord = (surgeryId) =>
  {
    console.log(surgeryId)
  }



    useEffect(() => {

      const fetchPatients = async () => {
        try {
          const data = await listPatients();  // Call the listPatients method
          setPatients(data);  // Update state with the fetched data
          
        } catch (error) {
          console.error("Error fetching patients data:", error);
        }
      };
      
      if (patients.length==0){
        fetchPatients();

      }
      console.log(refreshTab)
      if (refreshTab=="patientsList"){
        fetchPatients();
        console.log("redux refreshTab:"+refreshTab)
        dispatch(resetRefreshTab());
      }




      
      //console.log(patients)  
    }, [patients,refreshTab,selectedSurgeries]);


    const columns = generateColumns()
    
    return (
      <div>
       
          <ButtonCollection dataSource={patients} columns={columns} ids={selectedSurgeries} handleDateSurgeryChange={handleDateSurgeryChange} validateSurgeryDate={validateSurgeryDate}/>
          <Table
           rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns.map(col => ({
            ...col,
            responsive: ['xs', 'sm', 'md', 'lg'], 
          }))}
          pagination={false}
          dataSource={patients}
          bordered
          scroll={{ x: false }} 
          rowKey="id"
         
        />
      </div>
      
      );

}


export default PatientsList;