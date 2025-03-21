


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Descriptions,Button} from 'antd';

import dayjs from 'dayjs';
import WaitingTimeDisplayer from './WaitingTimeDisplayer';


const PatientSummary  = ({submittedData}) => {
    const dateFormat ='DD-MM-YYYY'
    const navigate = useNavigate();


    if (!submittedData) {
        return null; // Return nothing if no data is submitted
      }
      return (
        <div>
        <Descriptions title="Σύνοψη  Στοιχείων Ασθενή" layout={"vertical"} bordered={true}>

                <Descriptions.Item label="Όνομα">{submittedData.patientName}</Descriptions.Item>
                <Descriptions.Item label="Επώνυμο">{submittedData.patientSurname}</Descriptions.Item>
                <Descriptions.Item label="Πατρώνυμο">{submittedData.fatherName}</Descriptions.Item>
                <Descriptions.Item label=" Ηλικία">{submittedData.age}</Descriptions.Item>
                <Descriptions.Item label="Ημερομηνία Εξέτασης">{dayjs(submittedData.checkupDate).format(dateFormat)}</Descriptions.Item>
                <Descriptions.Item label="Ιδιότητα">{submittedData.property}</Descriptions.Item>
                {submittedData.rank &&<Descriptions.Item label="Βαθμός">{submittedData.rank}</Descriptions.Item>}
                {submittedData.armyRank &&<Descriptions.Item label="Όπλο/Σώμα">{submittedData.armyRank}</Descriptions.Item>}



                {submittedData.dischargeDate && <Descriptions.Item label="Ημερομηνία Απόλυσης">{dayjs(submittedData.dischargeDate).format(dateFormat)}</Descriptions.Item>}
                <Descriptions.Item label="Όνομα Πάθησης">{submittedData.diseaseName}</Descriptions.Item>
                <Descriptions.Item label="Περιγραφή Πάθησης">{submittedData.diseaseDescription}</Descriptions.Item>
                <Descriptions.Item label="Ανατομική Περιοχή">{submittedData.organ}</Descriptions.Item>
                <Descriptions.Item label="Επέμβαση">{submittedData.surgery}</Descriptions.Item>
                <Descriptions.Item label="Είδος">{submittedData.duty===1?"Έκτακτο":"Προγραμματισμένο"}</Descriptions.Item>
                {submittedData.duty == 1 && (<Descriptions.Item label="Ημερομηνία Eπέμβασης">{dayjs(submittedData.checkupDate).format(dateFormat)}</Descriptions.Item>)}
                
                <Descriptions.Item label="Παρατηρήσεις">{submittedData.comments || 'Καμία'}</Descriptions.Item>
               
    </Descriptions>
    {submittedData.duty === 0 ? (
  <WaitingTimeDisplayer
    surgeryId={submittedData.surgeryId}
    examDate={submittedData.checkupDate}
  />
) : (<Button type="primary" onClick={() => navigate('/', { state: { submittedData: null } })}>Επιστροφή</Button> )}
          </div>
    );

}



export default PatientSummary;