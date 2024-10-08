import axios from "axios";
const API_BASE_URL = 'http://127.0.0.1:5000';


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


export const listPatients = async ()=>{
  const response = await axios.get(`${API_BASE_URL}//patients/list`);
  return response.data;


}