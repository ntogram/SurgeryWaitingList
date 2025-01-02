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

export const deleteSurgeryRecord = async (surgeryId) =>{
  const response = await axios.delete(`${API_BASE_URL}/deleteSurgery`, {
    headers: {
      'Content-Type': 'application/json'
    },
    data: { surgeryId }
  });
  return response.data;
}





export const retrieveStatistics = async (option) =>{
  const response = await axios.get(`${API_BASE_URL}//statistics/${option}`);
  return response.data;
}



export const getWaitingTime = async (surgeryId,examDate) =>{

  const response = await axios.post(`${API_BASE_URL}//waitingTime`,{"surgeryId":surgeryId,"examDate":examDate}, { headers: { 'Content-Type': 'application/json' } });
    return response.data["estimatedDuration"];


}


// service for admin views

//login as administrator
export const login = async (username,password) =>{
  const response = await axios.post(`${API_BASE_URL}//login`, { "username":username, "password":password },{ headers: { 'Content-Type': 'application/json' } });
  console.log(response);
  console.log(response.data)
  return response.data;



}
// logout -- send tokens that must be blacklisted
export const logout = async (accessToken, refreshToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`, {}, {
      headers: { 
        Authorization: `Bearer ${accessToken}`,
        'X-Refresh-Token': refreshToken
      }
    });
    
    return response.data;
  } catch (error) {
    console.log(error);
    let errorMsg ="";
    if ("response" in error){
      errorMsg = error["response"]["data"]["msg"]
    }
    else{
      errorMsg ="Σφάλμα Διακομιστή"
    }
    return {"errorMessage":errorMsg}
  }
}

export const refresh = async (refreshToken) =>{
  const response = await axios.post(`${API_BASE_URL}//refresh`, {}, {
    headers: { Authorization: `Bearer ${refreshToken}` },
});
  return response.data['access_token']
}


export const deleteSurgeries = async (accessToken, startDate, endDate) => {
  try {
      // Use a single slash for the API endpoint and include the headers in the proper place
      const response = await axios.delete(`${API_BASE_URL}/deleteSurgeries`, {
          data: { "startDate":startDate,"endDate": endDate },
          headers: {
              Authorization: `Bearer ${accessToken}`,  // Include the access token in the header
          },
      });
      console.log(response.data);  // Handle response data as needed
      return response.data;
  } catch (error) {
      let msg=""
      let errorObj = null;
      if (error.response && error.response.status === 401) {
          console.error("Unauthorized: Token may be revoked or expired.");
          
          
          if ("response" in error){
            msg =  "Η συνδεση έληξε"
          
          }
          errorObj ={"message":msg,"expired":true}
          return errorObj
          // Handle token revocation or expiration, e.g., refresh token logic
      } else {
          console.error("Error deleting surgeries:", error);
      
      if ("response" in error){
        let errorResponse = error["response"]["data"]
        if ("error" in errorResponse){
          msg =  error["response"]["data"]["error"]
        }
        else if ("count" in errorResponse){
          errorObj = {"message":errorResponse["message"],"count":errorResponse["count"]}
          return errorObj
        }
      }
      else{
        msg =  "Σφάλμα Διακομιστή"
      }
    }
      errorObj =  {"message":msg,"error":true}
      return errorObj

  }
};
