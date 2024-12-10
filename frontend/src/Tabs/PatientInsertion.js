import React, { useEffect, useState,useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { insertPatiendData,addRank,addDischargeDate,addSurgeryData} from '../services/serviceAPI'; 
import { useSelector } from 'react-redux'; 
import axios from 'axios';
import dayjs from 'dayjs';
//import 'dayjs/locale/el'
import { Form, Input, Button,DatePicker,Select,InputNumber } from 'antd';
import PatientSummary from '../PatientSummary'
import { useNavigate } from 'react-router-dom';
import { Faker, el } from '@faker-js/faker'; 
//import moment from 'moment';
//import 'moment/locale/el';
//import locale from 'antd/es/date-picker/locale/el_GR';
import 'antd/dist/reset.css';


// Set Moment.js locale to Greek
//moment.locale('el');
//dayjs.locale('el');
const PatientInsertion  = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');  // State to store the backend message
  const dateFormat = 'YYYY-MM-DD';
  const textBoxLength = 4000;
  const today=dayjs(dayjs().format(dateFormat),dateFormat);
  const [submissionCount, setSubmissionCount] = useState(0);
  const { TextArea } = Input;
  const { properties, surgeries, ranks } = useSelector((state) => state.constants); 
  const navigate = useNavigate();                
  const returnButtonRef = useRef(null);

  const organs =  Object.keys(surgeries)
  console.log(location.state)
  const faker = new Faker({locale: [el]})
  

  
  
  

  const [selectedProperty, setSelectedProperty] = useState(null); 
  const [selectedRank,setSelectedRank] =  useState(null); 
  const [selectedOrgan,setSelectedOrgan]=useState(null)            
  const [form] = Form.useForm(); 



  const [submittedData, setSubmittedData] = useState(location.state?.submittedData );
  const searchField = (input, option) =>{
               
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
 
  const changeProperty= (value)=>
      {
        // set new property
        setSelectedProperty(value);
        // reset rank
        setSelectedRank(null);
        form.setFieldsValue({ rank: null });
        console.log(selectedRank)

      }

  const changeOrgan = (value) =>{
    setSelectedOrgan(value)
    form.setFieldsValue({ surgery: null });



  }



  const insertData = async (data)=> {
    console.log("insert data")
    const response = await insertPatiendData(data); // Call the service method
    console.log('Response from backend:', response)
    let patientId = null;
    if ("id" in response)
    {
      patientId = response['id']
    }
    return patientId
  }


const createNewSurgery = async(data) =>{
  const response = await addSurgeryData(data) // call service for storing surgery data
  let surgeryId = null;
  if ("id" in response)
  {
    surgeryId = response['id']
  }
  return surgeryId
}






  // Handle form submission
  const submitForm = async  () => {
    console.log("dsa")
    let data= form.getFieldsValue();
    data={
            ...data,
            "birthDate":dayjs(data.birthDate).format(dateFormat),
            "checkupDate":dayjs(data.checkupDate).format(dateFormat),
            "dischargeDate":data.dischargeDate?dayjs(data.dischargeDate).format(dateFormat):null
        }





    let patientId = await insertData(data);
    let propertyVal = data["property"];
    const propsWithRank = properties.slice(0,2);
    // make request for adding rank for army officers and policemen
    if (propsWithRank.includes(propertyVal)){
      let rank = data["rank"];
      let officerData = {"ID":patientId,"rank":rank}
      console.log(patientId)
      addRank(officerData);
      // make request for adding discharge date for soldiers
      if (propertyVal =="Στρατιωτικός" && rank =="Στρατιώτης (Στρ)" ){
        let dischargeData = {"ID":patientId,"dischargeDate":data["dischargeDate"]}
        addDischargeDate(dischargeData)
        }
      } 
     // make request for storing surgery data
     let surgeryData ={"ID":patientId,"examDate":data["checkupDate"],"disease":data["diseaseName"],"diseaseDescription":data["diseaseDescription"],"organ":data["organ"],"surgeryName":data["surgery"],"comments":data["comments"]}
     let surgeryId = await createNewSurgery(surgeryData)
     data["surgeryId"] = surgeryId;




    


    setSubmissionCount((prevCount) => prevCount + 1)  
    setSubmittedData(data);
  };

  // Handle form reset
  const reseForm = () => {
    form.resetFields();  // Resets all form fields
    setSubmittedData(null);
  };


  const onReturnToForm = () => {

    navigate('/', { state: { submittedData: null } })

  }
  
   const generateRandomPatient = () =>{
    const currentDate = dayjs().format('YYYY-MM-DD');
    console.log(currentDate)
    const randomProperty = properties[Math.floor(Math.random() * properties.length)];
    const randomOrgan = organs[Math.floor(Math.random() * organs.length)];
    const randomSurgery = surgeries[randomOrgan][Math.floor(Math.random() * surgeries[randomOrgan].length)];
    const randomRank = ranks[randomProperty] ? ranks[randomProperty][Math.floor(Math.random() * ranks[randomProperty].length)] : null;
    return {
        patientName: faker.person.firstName(),  // Generates Greek first name
        patientSurname: faker.person.lastName(),  // Generates Greek last name
        fatherName: faker.person.firstName(),  // Generates Greek first name for father
        birthDate: dayjs(faker.date.past(60, '2000-01-01')).format(dateFormat),  // Random birth date
        checkupDate: dayjs(faker.date.between({from:'2023-01-01', to:currentDate})).format(dateFormat),  // Random checkup date
        property: randomProperty,
        rank: randomRank,
        dischargeDate: randomProperty === 'Στρατιωτικός' && randomRank === 'Στρατιώτης (Στρ)' 
                        ? dayjs(faker.date.future(2, currentDate)).format(dateFormat) 
                        : null,
        diseaseName: faker.lorem.words(3),  // Random disease name (can remain in Greek)
        diseaseDescription: faker.lorem.sentences(2),  // Random disease description
        organ: randomOrgan,
        surgery: randomSurgery,
        comments: faker.lorem.sentences(2)  // Random comments
      };





}


 const fillAndSubmitForm = async (patientData,form) => {
    form.setFieldsValue({
      patientName: patientData.patientName,
      patientSurname: patientData.patientSurname,
      fatherName: patientData.fatherName,
      birthDate: dayjs(patientData.birthDate),
      checkupDate: dayjs(patientData.checkupDate),
      property: patientData.property,
      rank: patientData.rank,
      dischargeDate: patientData.dischargeDate ? dayjs(patientData.dischargeDate) : null,
      diseaseName: patientData.diseaseName,
      diseaseDescription: patientData.diseaseDescription,
      organ: patientData.organ,
      surgery: patientData.surgery,
      comments: patientData.comments
    });
    console.log(form.getFieldsValue())
    //submitForm(form.getFieldsValue())
    setSubmissionCount((prevCount) => prevCount + 1)  
    //form.submit();
  };
  

const sendData = async () =>{
    const currentDate = dayjs().format('YYYY-MM-DD');
    let promises = [];
    for (let i = 0; i < 70; i++) {
            let randomProperty = properties[Math.floor(Math.random() * properties.length)];
            let randomRank = null;
            let randomDischargeDate = null;
           

            if (randomProperty === 'Στρατιωτικός') {
              randomRank = ranks[randomProperty][Math.floor(Math.random() * ranks[randomProperty].length)];
              
              // Discharge date only if rank is 'Στρατιώτης (Στρ)'
              if (randomRank === 'Στρατιώτης (Στρ)') {
                randomDischargeDate = dayjs(faker.date.future(1, today)).format(dateFormat);
              }
            } else if (randomProperty === 'Αστυνομικός') {
              randomRank = ranks[randomProperty][Math.floor(Math.random() * ranks[randomProperty].length)];
            }

            let randomOrgan = organs[Math.floor(Math.random() * organs.length)];
            let randomSurgery = surgeries[randomOrgan][Math.floor(Math.random() * surgeries[randomOrgan].length)];

            let data= {
              patientName: faker.person.firstName(),  // Generates Greek first name
              patientSurname: faker.person.lastName(),  // Generates Greek last name
              fatherName: faker.person.firstName(),  // Generates Greek first name for father
              birthDate: dayjs(faker.date.past(60, '2000-01-01')).format(dateFormat),  // Random birth date
              checkupDate: dayjs(faker.date.between({from:'2023-01-01', to:currentDate})).format(dateFormat),  // Random checkup date
              property: randomProperty,
              rank: randomRank,
              dischargeDate: randomProperty === 'Στρατιωτικός' && randomRank === 'Στρατιώτης (Στρ)' 
                              ? dayjs(faker.date.future(2, currentDate)).format(dateFormat) 
                              : null,
              diseaseName: faker.lorem.words(3),  // Random disease name (can remain in Greek)
              diseaseDescription: faker.lorem.sentences(2),  // Random disease description
              organ: randomOrgan,
              surgery: randomSurgery,
              comments: faker.lorem.sentences(2)  // Random comments
            };
            data={
              ...data,
              "birthDate":dayjs(data.birthDate).format(dateFormat),
              "checkupDate":dayjs(data.checkupDate).format(dateFormat),
              "dischargeDate":data.dischargeDate?dayjs(data.dischargeDate).format(dateFormat):null
          }
          const insertPromise = insertData(data)
            .then(patientId => {
                const propsWithRank = properties.slice(0, 2); // Check for ranks

                // Store promises for rank and discharge data
                const subPromises = [];

                if (propsWithRank.includes(data.property)) {
                    let rank = data.rank;
                    let officerData = { ID: patientId, rank: rank };
                    subPromises.push(addRank(officerData));

                    // Add discharge date for soldiers
                    if (data.property === "Στρατιωτικός" && rank === "Στρατιώτης (Στρ)") {
                        let dischargeData = { ID: patientId, dischargeDate: data.dischargeDate };
                        subPromises.push(addDischargeDate(dischargeData));
                    }
                }

                // Make request for storing surgery data
                let surgeryData = {
                    ID: patientId,
                    examDate: data.checkupDate,
                    disease: data.diseaseName,
                    diseaseDescription: data.diseaseDescription,
                    organ: data.organ,
                    surgeryName: data.surgery,
                    comments: data.comments
                };
                subPromises.push(createNewSurgery(surgeryData));

                return Promise.all(subPromises);  // Resolve all sub-promises for this patient
            });

        // Add the main insert promise to the promises array
        promises.push(insertPromise);
    }

    // Wait for all insertions to complete
    console.log(promises)
    /*ry {
        await Promise.all(promises);
        console.log("All records inserted successfully.");
    } catch (error) {
        console.error("Error inserting records:", error);
    }*/
}


  // useEffect to fetch the backend message on component load
  useEffect(() => {
      const retrievePatientData = async () =>{





        
      }




    /*const submitRandomPatients = async () => {
      const randomData = generateRandomPatient();
      await fillAndSubmitForm(randomData,form);
      /*for (let i = 0; i < 1; i++) {
        const randomData = generateRandomPatient();
        console.log(randomData)
        await fillAndSubmitForm(randomData,form);
        
        // Simulate clicking the "Return to Form" button after submission
        if (returnButtonRef.current) {
          returnButtonRef.current.click();
        }
      }*/
    
    //submitRandomPatients();
      
  }, [submittedData,submissionCount]);  // Empty dependency array to run the effect once when the component loads

  return (
    <div>
      
   
        {/* Antd Form */}
      {submittedData===null?
      <Form
        name="basic"
        form={form} 
        initialValues={{ remember: true}}
        style={{ maxWidth: '20%', width: '100%' }} 
        autoComplete="off"
        onFinish={submitForm}
      >
        {/* patientName Field */}
        <Form.Item
          label="Ονομα"
          name="patientName"
          rules={[{ required: true, message: 'Παρακαλώ δώστε το όνομα του ασθενή' }]}
        >
          <Input placeholder="Όνομα" variant="filled" />
        </Form.Item>
        {/* patientSurname Field */}
        <Form.Item
          label="Επώνυμο"
          name="patientSurname"
          rules={[{ required: true, message: 'Παρακαλώ δώστε το επώνυμο του ασθενή' }]}
        >
          <Input placeholder="Επώνυμο" variant="filled" />
        </Form.Item>





        {/* fatherName Field */}
        <Form.Item
          label="Πατρώνυμο"
          name="fatherName"
          rules={[{ required: true, message: 'Παρακαλώ δώστε το πατρώνυμο του ασθενή' }]}
        >
          <Input placeholder="Πατρώνυμο" variant="filled" />
        </Form.Item>
         {/* birthDate Field*/}
         <Form.Item
          label="Ηλικία"
          name="age"
          rules={[{ required: true, message: 'Παρακαλώ επιλέξτε την ηλικία του ασθενή' }]}
        >
         <InputNumber variant={"filled"} min={0} max={110}  changeOnWheel={true} controls={true} />
        </Form.Item>
         {/* checkupDate */}
         <Form.Item
          label="Ημερομηνία Εξέτασης"
          name="checkupDate"
          rules={[{ required: true, message: 'Παρακαλώ επιλέξτε την ημερομηνία εξέτασης του ασθενή' }]}
        >
          <DatePicker variant="filled"  style={{maxWidth: '100%',width: '100%' }} maxDate={today} /> 
        </Form.Item>






        
         {/* Property Dropdown */}
         <Form.Item
          label="Ιδιότητα"
          name="property"
          rules={[{ required: true, message: 'Παρακαλώ επιλέξτε ιδιότητα' }]}
        >
          <Select
            placeholder="Επιλέξτε μια ιδιότητα"
            variant="filled"
            onChange={changeProperty}
          >
            {properties.map(property => (
              <Select.Option key={property} value={property}>
                {property}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Display dropdown for selecting rank if property=Στρατιωτικός or Αστυνομικός */}
        {(selectedProperty === 'Στρατιωτικός' || selectedProperty === 'Αστυνομικός') && (
          <Form.Item
            label="Βαθμός"
            name="rank"
            rules={[{ required: true, message: 'Παρακαλώ επιλέξτε βαθμό' }]}
          >
            <Select
              placeholder="Επιλέξτε βαθμό"
              variant="filled"
              value={selectedRank}
              onChange={(value) => setSelectedRank(value)}
              showSearch={selectedProperty === 'Στρατιωτικός'}
              optionFilterProp={selectedProperty === 'Στρατιωτικός' ? "children" : null}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {ranks[selectedProperty].map(rank => (
                <Select.Option key={rank} value={rank}>
                  {rank}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
        
        {/* display discharge date  when property=Στρατιωτικός  rank="Στρατιώτης (Στρ)" }*/}
         {(selectedProperty == 'Στρατιωτικός' && selectedRank =="Στρατιώτης (Στρ)")   && (
          <Form.Item
          label="Ημερομηνία Απόλυσης"
          name="dischargeDate"
          rules={[{ required: true, message: 'Παρακαλώ επιλέξτε την ημερομηνία απόλυσης' }]}
        >
          <DatePicker variant="filled" style={{maxWidth: '100%',width: '100%' }} minDate={today} /> 
        </Form.Item>
          )}

        {/* diseaseName Field */}
        <Form.Item
          label="Όνομα Πάθησης"
          name="diseaseName"
          rules={[{ required: true, message: 'Παρακαλώ επιλέξτε την  πάθηση' }]}
        >
          <Input placeholder="Όνομα Πάθησης" variant="filled" />
        </Form.Item>
        {/* diseaseDescription Field */}
        <Form.Item
                label="Περιγραφή Πάθησης"
                name="diseaseDescription"
                rules={[{ required: true, message: 'Παρακαλώ δώστε ένα κείμενο μέχρι 4000 χαρακτήρες για περιγραφή της  πάθησης' }]}
              >
                 <TextArea style={{resize: 'both',overflow: 'auto',maxWidth:'none'}} variant='filled' placeholder="Περιγραφή Πάθησης"  />
        </Form.Item>
         {/* Dropdown with Autocomplete  for organ selection */}
         <Form.Item
          label="Ανατομική Περιοχή"
          name="organ"
          rules={[{ required: true, message: 'Παρακαλώ επιλέξτε μια ανατομική περιοχή' }]}
        >
          <Select
            showSearch
            placeholder="Επιλέξτε ανατομική περιοχή" variant="filled"
            optionFilterProp="children"
            filterOption={searchField}
            onChange={(value) => changeOrgan(value)}
          >
            {organs.map(organ => (
              <Select.Option key={organ} value={organ}>
                {organ}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>    
         {/* Dropdown with Autocomplete  for surgery type selection */}
        {selectedOrgan && ( <Form.Item
          label="Επέμβαση"
          name="surgery"
          rules={[{ required: true, message: 'Παρακαλώ επιλέξτε επέμβαση' }]}
        >
          <Select
            showSearch
            placeholder="Επιλέξτε επέμβαση" variant="filled"
            optionFilterProp="children"
            filterOption={searchField}
           
          >
            {surgeries[selectedOrgan].map(surgery => (
              <Select.Option key={surgery} value={surgery}>
                {surgery}
              </Select.Option>
            ))}
          </Select>
        </Form.Item> )}   




         {/* comments Field */}
        <Form.Item
                label="Παρατηρήσεις"
                name="comments"
              >
                 <TextArea rows={4} style={{resize: 'both',overflow: 'auto',maxWidth:'none'}} variant='filled' placeholder="Σχόλια" maxLength={textBoxLength} />
        </Form.Item>

       










        {/* Submit Button */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Υποβολή
          </Button>
          <Button type="primary" danger onClick={reseForm} style={{ marginLeft: '5%' }}>
          Καθάρισμος
        </Button>
        </Form.Item>
      </Form>:null}
      <PatientSummary submittedData={submittedData}  /> 
  

     

    </div>
  );
};

export default PatientInsertion;