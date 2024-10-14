import axios from "axios";
const API_BASE_URL = 'http://127.0.0.1:5000';

// services used in  PatientInsertion
export const insertPatiendData = async (data) => {

   
    const response = await axios.post(`${API_BASE_URL}/patients/personalData`, data);
    return response.data;
  };


export const addRank = async (data) =>{
  const response = await axios.post(`${API_BASE_URL}/patients/rank`, data);
  return response.data;

}


export const addDischargeDate = async (data) =>{
  const response = await axios.post(`${API_BASE_URL}/patients/dischargeDate`, data);
  return response.data;

}



export const addSurgeryData = async (data) =>{
  const response = await axios.post(`${API_BASE_URL}/patients/addSurgery`, data);
  return response.data;

}

// services used in PatientsList
export const listPatients = async ()=>{
  const response = await axios.get(`${API_BASE_URL}//patients/list`);
  return response.data;
}


export const  updateReferral = async (surgeryId,referral)=>{
  const response = await axios.put(`${API_BASE_URL}//patients/updateReferral/${surgeryId}`,{"referral":referral});
  return response.data;
}

export const updateSurgeryDate = async (surgeryId,surgeryDate) =>{
  const response = await axios.put(`${API_BASE_URL}//patients/updateSurgeryDate/${surgeryId}`,{"surgeryDate":surgeryDate});
  return response.data;



}

export const retrieveStatistics = async (option) =>{
  const response = await axios.get(`${API_BASE_URL}//statistics/${option}`);
  return response.data;
}



export const getWaitingTime = async (surgeryId) =>{
  console.log(surgeryId)
  const response = await axios.post(`${API_BASE_URL}//waitingTime`,{"surgeryId":surgeryId}, { headers: { 'Content-Type': 'application/json' } });
    return response.data["estimatedDuration"];


}
