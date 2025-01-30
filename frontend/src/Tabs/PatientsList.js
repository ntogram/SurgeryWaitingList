import React,{ useState,useEffect} from 'react';
import { Table,Switch,Button,DatePicker,Tooltip,notification,Space,Popconfirm,Typography,Modal,Spin} from 'antd';
import { CheckOutlined, EditOutlined,DeleteOutlined,QuestionCircleFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {setRefreshTab,resetRefreshTab} from '../redux/reducers/tabSlice';
import dayjs from 'dayjs';

import getColumnSearchProps from '../Search/getColumnSearchProps '; 
import {listPatients,updateReferral,updateSurgeryDate,deleteSurgeryRecord} from '../services/serviceAPI'
import ButtonCollection from './utilities/ButtonCollection'
import PatientInsertion from './PatientInsertion';
const { Title} = Typography; 



// after refresh display loading for ameliorating the experience






const PatientsList  = () => {
   const [api, contextHolder] = notification.useNotification(); 
   const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);
   const [loading, setLoading] = useState(true);
   const [editFormId,setEditFormId] =useState(null);// each record has its own edit form. Each edit form  has an id (same as the record id)
   const [searchText, setSearchText] = useState('');
  const [patients, setPatients] = useState([]);
   const {today,surgeries,dataTypes,fullProperties,severities} = useSelector((state) => state.constants); 
   const current = useSelector((state) => state.tab.selectedTab);
   const surgeryTypes =  (Array.from(new Set(Object.values(surgeries).flat())).sort());
   const booleanAnswers=["Ναι","Όχι","Όλες"]
   const locfullProperties = ["Μόνιμος Στρατιωτικός", "Έφεδρος Στρατιωτικός", "Αστυνομικός", "Απόστρατος", "Μέλος", "Ιδιώτης"]
   // get name of refresh tab
   const refreshTab = useSelector((state) => state.tab.refreshTab);
    const [selectedListType,setSelectedListType]=useState(dataTypes[0])
   const dispatch = useDispatch();
   
  const openDeleteDialog = (status) =>{
    setDeleteBtnClicked(status)



  }

  const refresh = () => {
         
    dispatch(setRefreshTab(current));
    
  };



  const changeListType = (value)=>{
    setSelectedListType(value);
    refresh();
  }


  // make active the edit form with the given id
  const showEditForm = (id) => {
    setEditFormId(id);
    
  };

  // close edit form
  const handleCancel = () => {
    setEditFormId(null);
  };











   const [selectedSurgeries, setSelectedSurgeries] = useState({});
   const getRowSelection = (propertyKey) => ({
    selectedRowKeys: selectedSurgeries[propertyKey] || [],
    onChange: (newSelectedRowKeys) => {
      setSelectedSurgeries((prevSelected) => ({
        ...prevSelected,
        [propertyKey]: newSelectedRowKeys, // Update selection for the specific property
      }));
    },
    getCheckboxProps: (record) => ({
      disabled: record.referral === 'Ναι' || record.dischargeStatus === 'Ναι',
    }),
  });





  const getRowClassName = (record) => {
    return selectedSurgeries.includes(record.id) ? '.ant-table-row.selected-row' : '';
  };


  const getInitFormData =  (record)=>{
    let formFields = ["id","name","surname","fatherName","patientId",
                      "age","examDate","property","rank","armyRank",
                      "dischargeDate","disease","diseaseDescription",
                      "organ","surgery","comments","surgeryDate","referral","duty","surgeonist"];
    let initFormData =formFields.reduce((result, field) => {
      if (record.hasOwnProperty(field)) {
        if (field =="name"){
          result["patientName"] = record["name"];
        }
        else if(field =="surname"){
          result["patientSurname"] = record["surname"]
        }
        else if (field=="disease"){
          result["diseaseName"] = record["disease"]
        }
        else if (field == "property"){
          if (record[field].includes("Στρατιωτικός")){
            result[field] ="Στρατιωτικός"
          }
          else{
             result[field] = record[field]
          }
        }
        else if (field=="examDate"){
          //console.log(record["examDate"])
          result["checkupDate"] = dayjs(record["examDate"]);
        }
        else if (field=="dischargeDate"){
          result["dischargeDate"] = record["dischargeDate"] ? dayjs(record["dischargeDate"]) : null;
          //record["dischargeDate"] = dayjs(record["dischargeDate"]);
        }
        else if (field=="surgeryDate"){
          result["surgeryDate"] = record["surgeryDate"] ? dayjs(record["surgeryDate"]) : null;
          //record["surgeryDate"] = dayjs(record["surgeryDate"]);
        }
       


        else {
          result[field] = record[field];
        }
      }
      //result["checkUpDate"] =dayjs("2024-05-02")
      result["surgeryDateDisabled"] = disableSurgeryDatePicker(record)  
      result["referralDisabled"] =  disableReferral(record)
      return result;
    }, {});
    return initFormData;

  }

  const generateMainColumns = () =>{
    const columns =[{
      title: 'Ιδιότητα', 
      dataIndex: 'property',
      key: 'property',
      fixed: 'left', 
      sorter: (value1, value2) => value1['property'].localeCompare(value2['property']),
      filters: (fullProperties.concat("Όλοι")).map( fullProperty =>({text:fullProperty,value:fullProperty})),
      onFilter: (value, record) => value=="Όλοι"?true:record.property.includes(value)
    }]
    return columns

  }
  const generateMainData = () => {
    const propertyData = fullProperties.map(fullProperty => ({ key:fullProperty,property: fullProperty }));
    return propertyData;
  };
  
 
   
  // generate  property table headers
    const generateColumns = () => {











        const columns = [
          {
            title: 'Λειτουργίες',
            key: 'delete',
            align: 'center',
            render: (text, record) => (
              <Space wrap>
               
                              <Popconfirm 
                                title={<Title level={4} type={"warning"}>Ειδοποίηση Διαγραφής</Title>}
                                


                                description={<Title level={5} type={"warning"} italic={true} strong={true}>Είστε σίγουροι ότι θέλετε να διαγράψετε την εγγραφή για το χειρουργείο με {record.id};</Title>}
                                cancelText= {<Title level={4} type={"warning"} italic={true} strong={true}>Όχι</Title>} cancelButtonProps={{danger:true,variant:"solid",type:"primary",size:"large"}} 
                                okButtonProps={{size:"large",
                                    style: {
                                      backgroundColor: '#28a745'
                                    },
                                  }}
                                okText={<Title level={4} type={"warning"} italic={true} strong={true}>Ναι</Title>}
                                onConfirm={() => deleteRecord(record.id,record.propertyKey)}
                                icon={<QuestionCircleFilled />} 
                              >
                                      <Tooltip placement="bottom" arrow={false} title={"Διαγραφή"}>
                                                  <Button type="primary" htmlType="submit" danger  icon={<DeleteOutlined />}  onClick={openDeleteDialog}> 
                                                 </Button>
                                     </Tooltip> 
                              </Popconfirm> 
                              <Tooltip placement="bottom" arrow={false} title={"Επεξεργασία"}>
                                        <Button type="primary" htmlType="submit"   icon={<EditOutlined/>}  onClick={()=> setEditFormId(record.id)}> 
                                        </Button>
                              </Tooltip> 
                              <Modal title="Ενημέρωση Στοιχείων Περιστατικού" mask={false}  open={editFormId==record.id} footer={null} onCancel={handleCancel}>
                                         <PatientInsertion displayUpdateFields={true} initData={getInitFormData(record)}/>
                              </Modal>
             






              </Space>
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
            title: 'Βαθμός', 
            dataIndex: 'rank',
            key: 'rank',
            fixed: 'left',
            sorter: (value1, value2) => value1['rank'].localeCompare(value2['rank']),
            ...getColumnSearchProps('rank', searchText, setSearchText)
          
          },
         /* {
            title: 'Ιδιότητα', 
            dataIndex: 'property',
            key: 'property',
            fixed: 'left', 
            sorter: (value1, value2) => value1['property'].localeCompare(value2['property']),
            filters: (locfullProperties.concat("Όλοι")).map( fullProperty =>({text:fullProperty,value:fullProperty})),
            onFilter: (value, record) => value=="Όλοι"?true:record.property.includes(value)
          },*/
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
            title: 'Ημερομηνία Επέμβασης', 
            dataIndex: 'surgeryDate',
            key: 'surgeryDate',
            fixed: 'left', 
            render: (text, record) => 
             <div>
              {disableSurgeryDatePicker(record)? '-':
              
              
              
              
              !record.surgeryDone?
             <div>
             <span><DatePicker variant="filled" style={{maxWidth: '60%',width: '100%' }}  onChange={(date,dateString,id)=>handleDateSurgeryChange(date,dateString,record.id,record.propertyKey)} 
             defaultValue={record.surgeryDate!=null?dayjs(record.surgeryDate):null} minDate={dayjs(record.examDate)}
            /></span>
             
             <Tooltip placement="bottom" arrow={false} title={"Επικύρωση"}>
             <Button 
              type="primary" 
              shape="circle"
              style={{ marginLeft: '5%',backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }} 
              onClick={() => validateSurgeryDate(record.id,record.propertyKey)}
             
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
            onClick={() => validateSurgeryDate(record.id,record.propertyKey,false)}
            
          >
           <EditOutlined />
          </Button>
          </Tooltip>
          
          </div>}</div>
            
          },
          {
            title: 'Από εφημερία', 
            dataIndex: 'duty',
            key: 'duty',
            fixed: 'left', 
            sorter: (value1, value2) => value1['duty'].localeCompare(value2['duty']),
            filters: booleanAnswers.concat(["-"]).map( booleanAnswer =>({text:booleanAnswer,value:booleanAnswer})),
            onFilter: (value, record) =>  value=='Όλες'?true:record.duty.includes(value)
          },
          {
            title: 'Ονοματεπώνυμο Χειρουργού', 
            dataIndex: 'surgeonist',
            key: 'surgeonist',
            fixed: 'left',
            sorter: (value1, value2) => value1['surgeonist'].localeCompare(value2['surgeonist']),
            ...getColumnSearchProps('surgeonist', searchText, setSearchText)
          
          },
          {
            title: 'Διάρκεια επεμβάσεων Μικρή < 30 λεπτά Μεσαία < 75 λεπτά Μεγάλη < 210 λεπτά Πολύ μεγάλη > 210 λεπτά', 
            dataIndex: 'severity',
            key: 'severity',
            fixed: 'left', 
            sorter: (value1, value2) => value1['severity'].localeCompare(value2['severity']),
            filters: (severities.concat("Όλοι")).map( severity =>({text:severity,value:severity})),
            onFilter: (value, record) => value=="Όλοι"?true:record.severity===value
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
                      onChange={() => handleReferralChange(record.id,record.propertyKey)}
                      
                      checkedChildren="Ναι" 
                      unCheckedChildren="Όχι" 
                    />
                    {/* Add space and then the Submit button */}
                    <Tooltip placement="bottom" arrow={false} title={"Επικύρωση"}>
                    <Button 
                      type="primary" 
                      shape="circle"
                      style={{ marginLeft: '5%',backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }} 
                      onClick={() => validateReferral(record.id,record.propertyKey)}
                    
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
                  onClick={() => validateReferral(record.id,record.propertyKey,false)}
                
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
  const handleReferralChange = (id,propertyKey) => {
    const updatedPatients = patients[selectedListType][propertyKey].map(patient => {
      if (patient.id === id) {
        return {
          ...patient,
          referral: patient.referral === 'Ναι' ? 'Όχι' : 'Ναι'
        };
      }
      return patient;
    });
    setPatients((prevPatients) => ({
      ...prevPatients, // Spread the previous state
      [selectedListType]: {
        ...prevPatients[selectedListType], // Spread the current state
        [propertyKey]: updatedPatients, // Update the selected list within the selected state
      },
    }));
  };

// submit the selected referral answer
const validateReferral = async (surgeryId,propertyKey,status=true) => {

  const updatedPatients = patients[selectedListType][propertyKey].map(patient => {
    if (patient.id === surgeryId) {
      return {
        ...patient,
        referralSubmitted: status, // Set the submitted status to true
        referral:patient.referral!==null?patient.referral:'Όχι'
      };
    }
    return patient;
  });
  setPatients((prevPatients) => ({
    ...prevPatients, // Spread the previous state
    [selectedListType]: {
      ...prevPatients[selectedListType], // Spread the current state
      [propertyKey]: updatedPatients, // Update the selected list within the selected state
    },
  }));// Update state with submission
  if (status==true){
    let selectedPatient = patients[selectedListType][propertyKey].find(({ id }) => id == surgeryId);
    const referral = selectedPatient.referral=='Ναι'?1:0;
    const response = await updateReferral(selectedPatient.id,referral);
    refresh();
  }
 
};


// set the selected  surgery date
const handleDateSurgeryChange = (date,dateString,id,propertyKey) =>{
    console.log(id);
    console.log(propertyKey);  
    if(dateString==null){
      dateString = today.format('YYYY-MM-DD');
    }
    setPatients((prevPatients) => {
      const updatedPatients = prevPatients[selectedListType][propertyKey].map((patient) => {
          if (patient.id === id) {
              return {
                  ...patient,
                  surgeryDate: dateString,
              };
          }
          return patient;
      });
      return {
                ...prevPatients,
                [selectedListType]:{
                  ...prevPatients[selectedListType],
                  [propertyKey]:updatedPatients
                }
      }
  });
  }



const validateSurgeryDate = async (surgeryId,propertyKey,status=true) => {
    const updatedPatients = patients[selectedListType][propertyKey].map(patient => {
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

  setPatients((prevPatients) => ({
    ...prevPatients, // Spread the previous state
    [selectedListType]: {
      ...prevPatients[selectedListType], // Spread the current state
      [propertyKey]: updatedPatients, // Update the selected list within the selected state
    },
  }));

  if (status==true){
    let selectedPatient = patients[selectedListType][propertyKey].find(({ id }) => id == surgeryId);
    let surgeryDate =selectedPatient.surgeryDate;
   // const referral = selectedPatient.referral=='Ναι'?1:0;
    const response = await updateSurgeryDate(selectedPatient.id,surgeryDate);
    refresh();
  }
};

  const deleteRecord =  async (surgeryId,propertyKey) =>
  {


    const response = await deleteSurgeryRecord(surgeryId)
    let msg = response["message"]
    if  ("error" in response){
      api.error({message:"Σφάλμα Διαγραφής Χειρουργείου",description:msg})
    }
    else{
      if (response["count"]==0){
        api.warning({
          message: 'Διαγραφή Χειρουργείου',
          description:msg
        });
      }
      else{
      api.success({
        message: 'Διαγραφή Χειρουργείου',
        description:msg
      });
    }
    }









  
    const existingPatients =  patients[selectedListType][propertyKey];
    const updatedPatients = existingPatients.filter((existingPatient) => existingPatient.id !== surgeryId); // remove from table the deleted record
    setPatients((prevPatients) => ({
      ...prevPatients, // Spread the previous state
      [selectedListType]: {
        ...prevPatients[selectedListType], // Spread the current state
        [propertyKey]: updatedPatients, // Update the selected list within the selected state
      },
    }));// Update state  after deletion
    refresh(); 
  
    console.log(surgeryId)
  }



    useEffect(() => {

      const fetchPatients = async () => {
       
        try {
          const data = await listPatients();  // Call the listPatients method
          //console.log(data)
          setPatients(data);  // Update state with the fetched data
          
          
        } catch (error) {
          console.error("Error fetching patients data:", error);
        }
        finally {
          setLoading(false); // Hide spinner
      }
      };
      
      if (patients.length==0){
        fetchPatients();
        //setLoading(true);

      }
     // console.log(refreshTab)
      if (refreshTab=="patientsList"){
        fetchPatients();
        console.log("redux refreshTab:"+refreshTab)
        dispatch(resetRefreshTab());
        // close edit form if it is opened
        if (editFormId!==null){
          handleCancel();
        }



      }
     // console.log(patients)



      
      //console.log(patients)  
    }, [patients,refreshTab,selectedSurgeries]);



    //const headers = columns.filter(col => col.title!= "Λειτουργίες");
    
    const columns = generateColumns();
    const docfields =  ['Ονοματεπώνυμο Ασθενούς','Βαθμός','Ημερομηνία Εξέτασης','Πάθηση','Ημερομηνία Επέμβασης','Από εφημερία','Ονοματεπώνυμο Χειρουργού','Διάρκεια επεμβάσεων Μικρή < 30 λεπτά Μεσαία < 75 λεπτά Μεγάλη < 210 λεπτά Πολύ μεγάλη > 210 λεπτά']  ;
    const docColumns = columns.filter(col =>docfields.includes(col.title));
    const mainColumns = generateMainColumns();
    const allPropertiesRows = generateMainData();
    const selectedallPropertiesIds = allPropertiesRows.map((item) => item.key);

    const displayPatientsByProperty = (record) => {
      console.log('Rendering nested row for:', record);
      if (!patients || !patients[selectedListType]) {
        return   <Spin size="large" spinning={loading}></Spin>;
      }
      return (<Table
      rowSelection={{
       type: "checkbox",
       ...getRowSelection(record.property),
     }}
     columns={columns.map(col => ({
       ...col,
       responsive: ['xs', 'sm', 'md', 'lg'], 
     }))}
     pagination={false}
     dataSource={patients[selectedListType][record.property]}
     bordered
     scroll={{ x: false }} 
     rowKey="id"
    
   />)
    };

     /* ( <Table
       rowSelection={{
        type: "checkbox",
        ...rowSelection,
      }}
      columns={columns.map(col => ({
        ...col,
        responsive: ['xs', 'sm', 'md', 'lg'], 
      }))}
      pagination={false}
      dataSource={patients[selectedListType][record.property]}
      bordered
      scroll={{ x: false }} 
      rowKey="id"
     
    />)*/
  



    
    



    
    
    
    return (
      <div>
       {contextHolder}
          <ButtonCollection dataSource={patients} columns={docColumns} selectedRecords={selectedSurgeries} handleDateSurgeryChange={handleDateSurgeryChange} validateSurgeryDate={validateSurgeryDate} 
          selectedDataType={selectedListType} changeDataType={changeListType} dataTypes={dataTypes}   setLoading={setLoading}
          
          />
          
          
          
          
          
          
          
          
          <Spin size="large" spinning={loading}>
          <Table
          columns={mainColumns.map(col => ({
            ...col,
            responsive: ['xs', 'sm', 'md', 'lg'], 
          }))}
          pagination={false}
          dataSource={allPropertiesRows}
          expandable={{
            expandedRowRender: (record) => displayPatientsByProperty(record), // Correctly render nested content
            defaultExpandedRowKeys: selectedallPropertiesIds, // Expand all rows by default
          }}
          //dataSource={patients[selectedListType]}
          bordered
          scroll={{ x: false }} 
         
         
        />
        </Spin>
      </div>
      
      );

}


export default PatientsList;