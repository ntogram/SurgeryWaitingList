import sys
from flask import Flask,request,jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_jwt_extended import create_access_token,create_refresh_token, jwt_required, get_jwt_identity,get_jwt,decode_token
from db import db
from config import Config
from helpers import is_valid_date,isAfter,hasRank,isBoolean,readStatsFromDB,isSummer,isChristmas,getPostSummerDate,getPostChristmasDate,isEaster,calculateDateDiff,getExpectedSurgeryDate,adaptSurgeryDate
from models import *
from sqlalchemy import case, func,and_,or_
from sqlalchemy import update
from waitress import serve
from datetime import datetime
from queries import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = Config.SQLALCHEMY_TRACK_MODIFICATIONS
app.config["SECRET_KEY"] = Config.SECRET_KEY
app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY
app.config["SESSION_COOKIE_SECURE"] = Config. SESSION_COOKIE_SECURE 
app.config["SESSION_COOKIE_HTTPONLY"] = Config.SESSION_COOKIE_HTTPONLY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = Config.JWT_ACCESS_TOKEN_EXPIRES
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = Config.JWT_REFRESH_TOKEN_EXPIRES
app.config["JWT_TOKEN_LOCATION"] = Config.JWT_TOKEN_LOCATION
db.init_app(app)  # Initialize the db with the Flask app


CORS(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
limiter = Limiter(key_func=get_remote_address)
limiter.init_app(app)
#limiter = Limiter(app, key_func=get_remote_address)

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
    required_attributes = ["patientName","patientSurname","fatherName","age","property","patientId"]
    data = request.get_json()  # Get JSON data from the request
    print(data.keys())
    for required_attribute in required_attributes:
            if required_attribute not in data:
                return jsonify({"error": "Missing attribute:{0}".format(required_attribute)}), 400
            if  required_attribute == "age":
                age =data.get("age")
                valid = isinstance(age,int)
                if valid== False:
                    return jsonify({"error": "Error number format for age"}), 400
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
    patientId = data.get("patientId")
    if patientId is None:
        existing_patient = Patient.query.filter_by(name=name, surname=surname,fatherName=fatherName,age=age).first()
    else:
        existing_patient = Patient.query.filter_by(ID=patientId).first()
    
    if existing_patient is None:
        # Create a new Patient object
        try:
        
            new_patient = Patient(name=name, surname=surname,fatherName=fatherName,age=age,property=propertyVal)
            db.session.add(new_patient)
            db.session.commit()
           
               
        except Exception as e:
            db.session.rollback()  # Rollback in case of an error
            return jsonify({"error": str(e)}), 500
        return jsonify({"message": f"Patient with {new_patient.ID} added successfully!","id":new_patient.ID}), 201
    else:
        patientTable = Patient.__table__
        with db.engine.connect() as connection:
            print(data)
            stmt = update(patientTable).where(patientTable.c.ID==patientId).values(name= name , surname = surname, fatherName = fatherName, age =age, property =  propertyVal)
            result = connection.execute(stmt)
            # if  patient has property "Στρατιωτικός (Μόνιμος ή Έφεδρος)  and the value of updated property is different
            # remove the related records from officers and soldiers tables
            



            connection.commit()
        return jsonify({"message": f"Patient with {patientId} updated successfully!","id":patientId}), 200
       
       
       
       
    
        
      
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
    armyRank =  None
    if "armyRank" in data:
        armyRank =data.get("armyRank")
    #check if  the rank has been already stored for the patient(army officer or policeman) with officerID
    existing_officer = Officer.query.filter_by(officerID=officerId).first()
    if existing_officer is None:
        # store the rank
        new_officer =  Officer(officerID=officerId,officerRank=rank,armyRank=armyRank)
        db.session.add(new_officer)
        db.session.commit()
        return jsonify({"message": f"Rank for Patient with {officerId} added successfully!"}), 201
    else:
        if existing_officer.officerRank == rank or existing_officer.armyRank == armyRank:
             return jsonify({"message": f"Rank for Patient with {officerId} has already been stored"}), 200
        else:
            existing_officer.officerRank = rank
            existing_officer.armyRank =  armyRank
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
     valid = is_valid_date(dischargeDate)
     if valid== False:
            return jsonify({"error": "Error date format for dischargeDate"}), 400
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
     required_attributes = ["ID","examDate","disease","organ","surgeryName","surgeryId"]
     for required_attribute in required_attributes:
            if required_attribute not in data:
                return jsonify({"error": "Missing attribute:{0}".format(required_attribute)}), 400
     patientId = data.get("ID")
     surgeryId = data.get("surgeryId")
     examDate = data.get("examDate")
     valid = is_valid_date(examDate)
     if valid== False:
        return jsonify({"error": "Error date format for examDate"}), 400 
     disease =  data.get("disease")
     organ = data.get("organ")
     surgeryName = data.get("surgeryName")
     optional_attributes = ["diseaseDescription","comments","surgeryDate","referral"]
     optional_attr_values = {}
     for optional_attribute in optional_attributes:
        if optional_attribute in data:
            optional_attr_values[optional_attribute] = data.get(optional_attribute)
            if optional_attr_values[optional_attribute] is not None:
                if optional_attribute =="surgeryDate":
                    valid = is_valid_date( optional_attr_values[optional_attribute])
                    if valid==False:
                        return jsonify({"error": "Error date format for surgeryDate"}), 400 
                if optional_attribute=="referral":
                    if optional_attr_values[optional_attribute] not in [0,1]:
                        return jsonify({"error": "Error value for referral"}), 400 
        else:
            optional_attr_values[optional_attribute] = None
     surgery =Surgery.query.filter_by(surgeryId=surgeryId).first()
     if surgery is None:
        surgery = Surgery(examDate= examDate,disease=disease,diseaseDescription=optional_attr_values["diseaseDescription"],organ=organ,surgeryName=surgeryName,patientId=patientId,comments=optional_attr_values["comments"])
        db.session.add(surgery)
        db.session.commit()
        return jsonify({"message": f"Surgery with {surgery.surgeryId} added successfully!","id":surgery.surgeryId}), 201
     else:
        surgeryTable = Surgery.__table__
        with db.engine.connect() as connection:
            stmt = update(surgeryTable).where(surgeryTable.c.surgeryId==surgeryId).values(examDate=examDate,disease=disease,diseaseDescription=optional_attr_values["diseaseDescription"],organ=organ,surgeryName=surgeryName,patientId=patientId,comments=optional_attr_values["comments"],surgeryDate=optional_attr_values["surgeryDate"],referral=optional_attr_values["referral"])
            result = connection.execute(stmt)
            connection.commit()
        return jsonify({"message": f"Surgery with {surgeryId} updated successfully!","id":surgeryId}), 200
    




# service for calculating waiting time
@app.route('/waitingTime1',methods=["GET"])
def calculateWaitingTime1():
    # execute the query for calculating the waiting time
    result = db.session.execute(QUERY_CALC_WAITING_TIME,{"surgeryId": 254})
    # Fetch the result row from query
    rowResult = result.fetchone()
    print(rowResult)
    # calculate wait time
    estimatedDuration =  float(rowResult[0])
    # Find expected surgery date
    # get surgery with the given id
    surgery = db.session.get(Surgery, 254)
    print(surgery)
    if surgery:     
        examDate = surgery.examDate
        expectedSurgeryDate = getExpectedSurgeryDate(examDate,estimatedDuration) # calculate expected surgery date
        expectedSurgeryDate = adaptSurgeryDate(expectedSurgeryDate) # adapt surgery  date for cases that it is in holiday periods
        estimatedDuration = calculateDateDiff(examDate,expectedSurgeryDate)  # calculate new waiting time
        return jsonify({"estimatedDuration":estimatedDuration,"examDate":examDate,"surgeryDate":expectedSurgeryDate}),200
    return jsonify({"Error":"Some error occured"}),404











# service for calculating waiting time
@app.route('/waitingTime',methods=["POST"])
def calculateWaitingTime():
    data = request.get_json()
    required_attributes = ["surgeryId","examDate"]
    for required_attribute in required_attributes:
            if required_attribute not in data:
                return jsonify({"error": "Missing attribute:{0}".format(required_attribute)}), 400
    try:
        surgeryId = int(data["surgeryId"])
    except ValueError:
         return jsonify({"error": "Error date format for surgeryId"}), 400

    # check if the given exam date is valid
    examDate = data.get("examDate")
    valid = is_valid_date(examDate)
    if valid== False:
        return jsonify({"error": "Error date format for examDate"}), 400 


    # execute the query for calculating the waiting time
    result = db.session.execute(QUERY_CALC_WAITING_TIME,{"surgeryId": surgeryId,"examDate":examDate})
    # Fetch the result row from query
    rowResult = result.fetchone()
    print(rowResult)
    # calculate wait time
    estimatedDuration =  float(rowResult[0])
    print("initial estimation:",estimatedDuration)
    # Find expected surgery date
    # get surgery with the given id
    surgery = db.session.get(Surgery, surgeryId)
    if surgery:     
        examDate = surgery.examDate
        expectedSurgeryDate = getExpectedSurgeryDate(examDate,estimatedDuration) # calculate expected surgery date
        print("expected date before adaptation:",expectedSurgeryDate)
        expectedSurgeryDate = adaptSurgeryDate(expectedSurgeryDate) # adapt surgery  date for cases that it is in holiday periods
        print("expected date before adaptation:",expectedSurgeryDate)
        estimatedDuration = calculateDateDiff(examDate,expectedSurgeryDate)  # calculate new waiting time
        print("final estimation:",estimatedDuration)
    return jsonify({"estimatedDuration":estimatedDuration,"examDate":examDate,"surgeryDate":expectedSurgeryDate}),200




@app.route('/patients/list',methods=['GET'])
def listWaitingPatients():
    # query for retrieving the list  of patients along with information related with the status of patient
    query  = db.session.query(
        Surgery.surgeryId.label('id'),
        Patient.name.label("name"),
        Patient.surname.label("surname"),
        Patient.fatherName.label("fatherName"),
        Patient.ID.label("patientId"),
        Patient.age.label("age"),
        Officer.officerRank.label("rank"),
        Officer.armyRank.label("armyRank"),
        func.concat(Patient.name, ' ', Patient.surname).label('patientName'), # get the conatenation of patient name and surname
        Patient.property.label("property"), #get the property
        Surgery.disease.label('disease'),  # get the name of related disease
        Surgery.diseaseDescription.label("diseaseDescription"),
        Surgery.organ.label("organ"),
        Surgery.surgeryName.label("surgery"),
        Surgery.comments.label("comments"),
       func.date_format(Surgery.examDate, '%Y-%m-%d').label('examDate'), # get exam date IN YYYY-MM-DD format
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
        ).outerjoin(Soldier, Patient.ID == Soldier.soldierID).join(Surgery,Patient.ID == Surgery.patientId
        ).outerjoin(Officer,Officer.officerID==Patient.ID)

        
        
        
    patients =query.all()
    patient_list = [
        {
            'id':patient.id, # actually  surgery id not patient id
            'patientId':patient.patientId,
            'name':patient.name,
            'surname':patient.surname,
            'fatherName':patient.fatherName,
            'patientName': patient.patientName,
            'age':patient.age,
            'property': patient.property,
            'rank':patient.rank,
            'armyRank':patient.armyRank,
            'dischargeDate':patient.discharge_date,
            'diseaseDescription':patient.diseaseDescription,
            'organ':patient.organ,
            'surgery':patient.surgery,
            'comments':patient.comments,
            'disease': patient.disease,
            'examDate':patient.examDate,
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
    
    # for retrieving statistics for all surgeries condition TRUE
    # for retrieving statistics for pending surgeries  surgeryDate IS NULL AND ACTIVE=1
    # for retrieving statistics for completed surgeries surgeryDate IS NOT NULL AND ACTIVE=0
    allStatistics={"Όλες":{"condition":"TRUE","results":None},"Εκκρεμείς":{"condition":"surgeryDate IS NULL AND ACTIVE=1","results":None},"Ολοκληρωμένες":{"condition":"surgeryDate IS NOT NULL AND ACTIVE=0","results":None}}
    # Based on the option, choose the appropriate query and parameter for the function
    if option == 'organ':
        for statType in allStatistics:
            allStatistics[statType]["results"] = readStatsFromDB(db, QUERY_SURGERIES_BY_ORGAN,allStatistics[statType]["condition"],'organ')
    elif option == 'surgery':
         for statType in allStatistics:
            allStatistics[statType]["results"] = readStatsFromDB(db, QUERY_SURGERIES_BY_SURGERYTYPE,allStatistics[statType]["condition"],'surgery')
    # Return the statistics as a JSON response
    #print(allStatistics)
    allResults = {key: value["results"] for key, value in allStatistics.items()}
    return jsonify(allResults)








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




@app.route('/deleteSurgery', methods=['DELETE'])
def deleteSurgery():
    data = request.get_json()
    if "surgeryId" not in data:
                return jsonify({"error": "Λείπει το πεδίο: surgeryId"}), 400
    else:
        surgeryId =data.get("surgeryId")
        deleted_count = Surgery.query.filter(Surgery.surgeryId == surgeryId).delete()
        db.session.commit()
        if deleted_count > 0:
            return jsonify({'message': f'H επέμβαση με id:{surgeryId} έχει  διαγραφεί επιτυχώς','count':deleted_count}),200
        else:
            return jsonify({'message': f'Δε βρέθηκε εγγραφή επέμβασης με {surgeryId}','count':deleted_count}), 404





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

     duration = calculateDateDiff(examDate,newDate)   
     return jsonify({"initDate": examDate,"newDate":newDate,"extraDelay":extraDelay,"period":period,"delay":N,"duration":duration})


# Admin View
# register user
@app.route('/register', methods=['POST'])
def register():
    # get data provided by user
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    # throw error if user with the given username already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "User already exists"}), 400
    # hash given password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    #create user with the given username and the hashed value of password
    new_user = User(username=username, password=hashed_password)
    #store user
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# Rate limit login to 5 attempts per minute per IP
@app.route('/login', methods=['POST'])
@limiter.limit("5 per minute")
def login():
    # get data given from login form
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    # check if  there is user account with the given username
    user = User.query.filter_by(username=username).first()
    # check if the given password is correct
    if user and bcrypt.check_password_hash(user.password, password):
        # if the given password is correct, retrieve access token
        access_token = create_access_token(identity=user.username)
        refresh_token = create_refresh_token(identity=user.username)
        #primary address -> access token  secondary address -> refresh token
        return jsonify({"access_token": access_token,"refresh_token":refresh_token,"isLoggedIn":True}), 200
    # if the given password is wrong
    return jsonify({"errorMessage": "Λάνθασμένο όνομα χρήστη ή κωδικός πρόσβασης","isLoggedIn":False,"access_token": None,"refresh_token":None}), 401


@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)  # Ensure only refresh tokens are allowed
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify({"access_token": new_access_token}), 200




@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # Get the JWT ID (jti) from the current access token
    jti_access = get_jwt()['jti']
    
    # Blacklist the access token
    blacklisted_access_token = TokenBlacklist(jti=jti_access)
    db.session.add(blacklisted_access_token)

    # Get the refresh token from the request header if provided
    refresh_token = request.headers.get('X-Refresh-Token')  # Use the custom header
    if refresh_token:
        jti_refresh = decode_token(refresh_token)['jti']  # Extract jti from the refresh token
        blacklisted_refresh_token = TokenBlacklist(jti=jti_refresh)
        db.session.add(blacklisted_refresh_token)

    db.session.commit()

    return jsonify({"message": "Successfully logged out"}), 200






    db.session.commit()

    return jsonify({"message": "Successfully logged out"}), 200

@app.route('/deleteSurgeries', methods=['DELETE'])
@jwt_required()
def protected():
    # Check if the token is blacklisted
    jti = get_jwt()['jti']
    if TokenBlacklist.query.filter_by(jti=jti).first() is not None:
        return jsonify({"errorMessage": "Token has been revoked"}), 401

    current_user_username = get_jwt_identity()
    required_fields = ["startDate","endDate"]
    errorFields ={"startDate":"Αρχική Ημερομηνία","endDate":"Τελική Ημερομηνία"}
    # get data given from  delete surgeries form
    data = request.get_json()
    # check if the date range  is given 
    for required_field in required_fields:
            if required_field not in data:
                return jsonify({"error": "Λείπει το πεδίο: {0}".format(errorFields[required_field])}), 400
            print(data[required_field])
            # check if dates have the appropriate format
            if data[required_field] is not None:
                if not is_valid_date(data[required_field]):
                    return jsonify({"error": " Μη έγκυρη τιμή για το πεδίο: {0}".format(errorFields[required_field])}), 400 


    startDate = data["startDate"]
    endDate = data["endDate"]
     # Convert string dates to datetime objects
    startDateObj = datetime.strptime(startDate, '%Y-%m-%d')
    endDateObj = datetime.strptime(endDate, '%Y-%m-%d')
    # check if end date is after start date
    endDateStatus = isAfter(startDateObj,endDateObj)
    if endDateStatus == True:
        # Delete surgeries within the date range
        deleted_count = Surgery.query.filter(Surgery.examDate >= startDateObj,Surgery.examDate <= endDateObj).delete()
        db.session.commit()
        if deleted_count > 0:
             return jsonify({'message': f'{deleted_count}  εγγραφές για τις επεμβάσεις  των ασθενών που εξετάστηκαν από {startDate} εώς {endDate} έχουν  διαγραφεί επιτυχώς','count':deleted_count}),200
        else:
            return jsonify({'message': f'Δε βρέθηκαν εγγραφές για επεμβάσεις ασθενών που εξετάστηκαν από {startDate} εώς {endDate}.','count':deleted_count}), 404
    else:
         return jsonify({"error": "Λάθος τιμή για το πεδίο {0}. Αποδεκτές ημερομηνίες όσες είναι μετά από {1}".format(errorFields["endDate"],startDate)}), 400 



if __name__ == '__main__':
 # Check for command-line argument
    if len(sys.argv) != 2:
        print("Usage: python app.py [dev|prod]")
    else:
        mode = sys.argv[1].lower()

        if mode == "--dev" or mode=="dev":
            # For development, use Flask's built-in server
            print("Running in development mode...")
            app.run(host='0.0.0.0', port=5000, debug=True)

        elif mode == "--prod" or mode=="prod":
            # For production, use Waitress server
            print("Running in production mode...")
            serve(app, host='127.0.0.1', port=5000)

        else:
            print("Error: Invalid argument. Please use 'dev' or 'prod'.")
    
