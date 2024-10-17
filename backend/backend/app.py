from flask import Flask,request,jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from db import db
from config import Config
from helpers import is_valid_date,hasRank,isBoolean,readStatsFromDB,isSummer,isChristmas,getPostSummerDate,getPostChristmasDate,isEaster
from models import *
from sqlalchemy import case, func,and_,or_
from datetime import datetime
from queries import *
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = Config.SQLALCHEMY_TRACK_MODIFICATIONS
db.init_app(app)  # Initialize the db with the Flask app


CORS(app)


@app.route('/api/test')
def test_patient_insertion():
    officer =  Officer(officerID=26,armyRank="Ανώτατος")
    #new_patient = Patient(name='ασψ', surname='σ11ρ',fatherName='δ11',birthDate='1996-05-09',property='Έφεδρος Στρατιωτικός')
    db.session.add(officer)
    db.session.commit()
    return jsonify({"answer": "test patient insert"})



# Load configuration from config.py
#app.config.from_object(Config)
# Initialize the database instance

# Initialize the database with the app
#db.init_app(app)


# insert patient personal  data
@app.route('/patients/personalData', methods=['POST'])
def add_patient():
    required_attributes = ["patientName","patientSurname","fatherName","birthDate","property"]
    data = request.get_json()  # Get JSON data from the request
    print(data.keys())
    for required_attribute in required_attributes:
            if required_attribute not in data:
                return jsonify({"error": "Missing attribute:{0}".format(required_attribute)}), 400
            if  required_attribute == "birthDate":
                birthDate =data.get("birthDate")
                valid = is_valid_date(birthDate)
                if valid== False:
                    return jsonify({"error": "Error date format for birthDate"}), 400
            if required_attribute == "property":        
                    propertyVal = data.get("property")
                    if propertyVal not in ["Στρατιωτικός", "Αστυνομικός", "Απόστρατος", "Μέλος", "Ιδιώτης"]:
                            return jsonify({"error": "Error property value"}), 400
                    else:
                        rankStatus=hasRank(propertyVal)
                        if rankStatus:
                            try:
                                rank = data.get("rank")
                            except Exception as e:
                                 return jsonify({"error": "Missing attribute: rank"}), 400
                            if propertyVal == "Στρατιωτικός":
                                if rank == "Στρατιώτης (Στρ)":
                                    propertyVal = "Έφεδρος Στρατιωτικός"
                                else:
                                    propertyVal = "Μόνιμος Στρατιωτικός" 
                        else:
                            rank =  None   
        # Extract rest data
    name = data.get('patientName')
    surname = data.get('patientSurname')
    fatherName = data.get('fatherName')
   
    # check if patient already exists
    existing_patient = Patient.query.filter_by(name=name, surname=surname,fatherName=fatherName,birthDate=birthDate).first()
    if existing_patient is None:
        # Create a new Patient object
        try:
        
            new_patient = Patient(name=name, surname=surname,fatherName=fatherName,birthDate=birthDate,property=propertyVal)
            db.session.add(new_patient)
            db.session.commit()
           
               
        except Exception as e:
            db.session.rollback()  # Rollback in case of an error
            return jsonify({"error": str(e)}), 500
        return jsonify({"message": f"Patient {name} added successfully!","id":new_patient.ID}), 201
    else:
        if propertyVal ==  existing_patient.property:
            return jsonify({"message": f"Patient {name} has already stored","id":existing_patient.ID}), 200
        else:
            existing_patient.property =  propertyVal
            db.session.commit()
            return jsonify({"message": f"Patient {name} has already stored  with different property","id":existing_patient.ID}), 200
    
        
      
    '''
    # Create a new Patient object
    new_patient = Patient(name=name, age=age)

    # Add the new patient to the database
    db.session.add(new_patient)
    db.session.commit()

    return jsonify({"message": f"Patient {name} added successfully!"}), 201
except Exception as e:
    db.session.rollback()  # Rollback in case of an error
    return jsonify({"error": str(e)}), 500

'''

@app.route('/patients/rank', methods=['POST'])
def add_rank():
    required_attributes = ["ID","rank"]
    data = request.get_json()
    # errpr handling for missing required fields for officer
    for required_attribute in required_attributes:
            if required_attribute not in data:
                return jsonify({"error": "Missing attribute:{0}".format(required_attribute)}), 400
    officerId = data.get("ID")
    rank =  data.get("rank")
    #check if  the rank has been already stored for the patient(army officer or policeman) with officerID
    existing_officer = Officer.query.filter_by(officerID=officerId).first()
    if existing_officer is None:
        # store the rank
        new_officer =  Officer(officerID=officerId,armyRank=rank)
        db.session.add(new_officer)
        db.session.commit()
        return jsonify({"message": f"Rank for Patient with {officerId} added successfully!"}), 201
    else:
        if existing_officer.armyRank == rank:
             return jsonify({"message": f"Rank for Patient with {officerId} has already been stored"}), 200
        else:
            existing_officer.armyRank = rank
            db.session.commit()
            return jsonify({"message": f"Rank for Patient with {officerId} has been updated"}), 200


@app.route('/patients/dischargeDate', methods=['POST'])
def addDischargeDate():
     data = request.get_json()
     required_attributes = ["ID","dischargeDate"]
     # error handling for missing required fields for soldier
     for required_attribute in required_attributes:
            if required_attribute not in data:
                return jsonify({"error": "Missing attribute:{0}".format(required_attribute)}), 400
     soldierId = data.get("ID")
     dischargeDate=data.get("dischargeDate")
     #check if  the discharge date has been already stored for the patient (soldier) with soldierID
     existing_soldier = Soldier.query.filter_by(soldierID=soldierId).first()
     if existing_soldier is None:
        # store the rank
        new_soldier =  Soldier(soldierID=soldierId,dischargeDate=dischargeDate)
        db.session.add(new_soldier)
        db.session.commit()
        return jsonify({"message": f"Discharge date for Patient with {soldierId} added successfully!"}), 201
     else:
        if existing_soldier.dischargeDate == dischargeDate:
             return jsonify({"message": f"Discharge date for Patient with {soldierId} has already been stored"}), 200
        else:
            existing_soldier.dischargeDate = dischargeDate
            db.session.commit()
            return jsonify({"message": f"dischargeDate date for Patient with {soldierId} has been updated"}), 200


@app.route('/patients/addSurgery', methods=['POST'])
def addSurgery():
     data = request.get_json()
     print(data)
     print(data.keys())
     # error handling for missing required fields for surgery
     required_attributes = ["ID","examDate","disease","organ","surgeryName"]
     for required_attribute in required_attributes:
            if required_attribute not in data:
                return jsonify({"error": "Missing attribute:{0}".format(required_attribute)}), 400
     patientId = data.get("ID")
     examDate = data.get("examDate")
     disease =  data.get("disease")
     organ = data.get("organ")
     surgeryName = data.get("surgeryName")
     if "diseaseDescription" in data:
        diseaseDescription =  data.get("diseaseDescription")
     else:
        diseaseDescription =None
     if "comments" in data:
        comments = data.get("comments")
     else:
        comments = None
     surgery = Surgery(examDate= examDate,disease=disease,diseaseDescription=diseaseDescription,organ=organ,surgeryName=surgeryName,patientId=patientId)
     db.session.add(surgery)
     db.session.commit()
     return jsonify({"message": f"Surgery with {surgery.surgeryId} added successfully!","id":surgery.surgeryId}), 201





# service for calculating waiting time
@app.route('/waitingTime',methods=["POST"])
def calculateWaitingTime():
    data = request.get_json()
    required_attributes = ["surgeryId"]
    for required_attribute in required_attributes:
            if required_attribute not in data:
                return jsonify({"error": "Missing attribute:{0}".format(required_attribute)}), 400
    try:
        surgeryId = int(data["surgeryId"])
    except ValueError:
         return jsonify({"error": "Error date format for surgeryId"}), 400
    # execute the query for calculating the waiting time
    result = db.session.execute(QUERY_CALC_WAITING_TIME,{"surgeryId": surgeryId})
    # Fetch the result row from query
    rowResult = result.fetchone()
    estimatedDuration =  float(rowResult[0])
    return jsonify({"estimatedDuration":estimatedDuration}),200




@app.route('/patients/list',methods=['GET'])
def listWaitingPatients():
    # query for retrieving the list  of patients along with information related with the status of patient
    query  = db.session.query(
        Surgery.surgeryId.label('id'),
        func.concat(Patient.name, ' ', Patient.surname).label('patientName'), # get the conatenation of patient name and surname
        Patient.property.label("property"), #get the property
        Surgery.disease.label('disease'),  # get the name of related disease
       func.date_format(Surgery.surgeryDate, '%Y-%m-%d').label('surgeryDate'), # get surgery date IN YYYY-MM-DD format
        Soldier.dischargeDate.label('discharge_date'),
        case((and_(
                    Surgery.surgeryDate.is_(None),
                    Surgery.referral == 0,
                    or_(Soldier.dischargeDate.is_(None),Soldier.dischargeDate >= datetime.now())
                ),'Ναι'),else_="Όχι").label("active"), #calculate if patient remains in the surgeries list
         case((Surgery.referral == 1, 'Ναι'),else_='Όχι').label('referral'), # for true return Ναι else return Όχι
         case(
            (Soldier.dischargeDate < datetime.now(),"Ναι"),
            (Soldier.dischargeDate >= datetime.now(),"Όχι"),
            else_='-').label('dischargeStatus'),
        
        
        
        
        
        
        #Soldier.dischargeDate < datetime.now()).label('dischargeStatus'),
        Surgery.surgeryDate.is_not(None).label("surgeryDone") # check if surgeryDate exists
        # outer join with the corresponding table for getting discharge date for soldier
        ).outerjoin(Soldier, Patient.ID == Soldier.soldierID).join(
            Surgery,Patient.ID == Surgery.patientId
        ) 
        
        
        
    patients =query.all()
    patient_list = [
        {
            'id':patient.id, # actually  surgery id not patient id
            'patientName': patient.patientName,
            'property': patient.property,
            'disease': patient.disease,
            'surgeryDate':patient.surgeryDate,
            'discharge_date':patient.discharge_date,
            "active":patient.active,
            'dischargeStatus':patient.dischargeStatus,
            'referral':patient.referral,
            "surgeryDone":patient.surgeryDone,
            'referralSubmitted':True
        }
        for patient in patients
    ]

    # Return the list as JSON
    return jsonify(patient_list)




@app.route('/statistics/<string:option>',methods=['GET'])
def getStatistics(option:str):
     # Check if the 'option' is valid (either 'organ' or 'surgery')
    if option not in ['organ', 'surgery']:
        return jsonify({'error': 'Invalid option parameter. Accepted values are: surgery, organ.'}), 400
    # Based on the option, choose the appropriate query and parameter for the function
    if option == 'organ':
        statistics = readStatsFromDB(db, QUERY_SURGERIES_BY_ORGAN, 'organ')
    elif option == 'surgery':
        statistics = readStatsFromDB(db, QUERY_SURGERIES_BY_SURGERYTYPE, 'surgery')
    # Return the statistics as a JSON response
    return jsonify(statistics)








@app.route('/patients/updateReferral/<int:surgery_id>',methods=['PUT'])
def updateReferral(surgery_id:int):
    required_fields = ['referral']
    data = request.get_json()
    # error handling for missing fields that are required for updating referral
    for required_field in required_fields:
            if required_field not in data:
                return jsonify({"error": "Missing attribute:{0}".format(required_field)}), 400
            if isBoolean(data.get(required_field))== False:
                return jsonify({"error": "Wrong type for attribute:{0}".format(required_field)}), 400 
    newReferral = data.get('referral')
    # retrieve the surgery with the given id
    surgery =db.session.query(Surgery).filter_by(surgeryId=surgery_id).one()
    #if the surgery doesn't exist
    if surgery is None:
            return jsonify({'error': f'Surgery with ID {surgery_id} not found'}), 404
    surgery.referral =  newReferral
    if newReferral == 1:
        newActive =0
        surgeryDate  = None
    else:
        if surgery.surgeryDate is None:
            newActive = 1
            surgeryDate = None
        else:
            newActive = 0
            surgeryDate = surgery.surgeryDate
    surgery.active = newActive
    surgery.surgeryDate = surgeryDate
    db.session.commit()
    return jsonify({'message': f' For surgery with ID {surgery_id}, update was performed successfully', "updated values":{
        'referral':newReferral,'active':newActive,'surgeryDate':surgeryDate}}),200
    
@app.route('/patients/updateSurgeryDate/<int:surgery_id>',methods=['PUT'])    
def updateSurgeryDate(surgery_id:int):
    required_fields = ["surgeryDate"]
    data = request.get_json()
    # error handling for missing fields that are required for updating surgeryDate
    for required_field in required_fields:
            if required_field not in data:
                return jsonify({"error": "Missing attribute:{0}".format(required_field)}), 400
            print(data[required_field])
            if data[required_field] is not None:
                if not is_valid_date(data[required_field]):
                    return jsonify({"error": "Wrong type for attribute:{0}".format(required_field)}), 400 
    
    newSurgeryDate = data.get("surgeryDate")
     # retrieve the surgery with the given id
    surgery =db.session.query(Surgery).filter_by(surgeryId=surgery_id).one()
    #if the surgery doesn't exist
    if surgery is None:
            return jsonify({'error': f'Surgery with ID {surgery_id} not found'}), 404
    surgery.surgeryDate = newSurgeryDate
    if newSurgeryDate is  None:
       newActive = 1
       newReferral = surgery.referral
    else:
        newActive = 0
        newReferral = 0
    surgery.active = newActive
    surgery.referral = newReferral
    db.session.commit()
    return jsonify({'message': f' For surgery with ID {surgery_id}, update was performed successfully', "updated values":{
        'referral':newReferral,'active':newActive,'surgeryDate':newSurgeryDate}}),200









@app.route('/')
def home():
    return "Hello from the Python backend new!"

from dateutil.relativedelta import relativedelta
@app.route('/api/answer')
def get_answer():
     surgeryId = 158
     retrievedSurgery =  Surgery.query.get(surgeryId)
     examDate = retrievedSurgery.examDate;
     # Define the number of months to add
     N = 7  
     # Calculate the date N months after the exam date
     newDate = examDate+ relativedelta(months=N)
     extraDelay = False
     period="Normal"
     # check if proposed surgery date is in Summer Holidays
     if isSummer(newDate.month) :
        extraDelay = True
        period = "Summer"
        newDate= getPostSummerDate(newDate.year)            
     
     
     # check if proposed surgery date is in Christmas Holidays
     print(newDate)
     if isChristmas(newDate.month,newDate.day):
        extraDelay = True
        period = "Christmas"
        newDate = getPostChristmasDate(newDate.year,newDate.month)
     # check if the proposed surgery date is in Easter Holidats
     easterFeatures = isEaster(newDate)
     if easterFeatures[0]:
         extraDelay = True
         period = "Easter"
         newDate = easterFeatures[1]

   
     return jsonify({"initDate": examDate,"newDate":newDate,"extraDelay":extraDelay,"period":period,"delay":N})





if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000,debug=True)
    
