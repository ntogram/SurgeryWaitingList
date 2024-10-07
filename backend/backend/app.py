from flask import Flask,request,jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from db import db
from config import Config
from helpers import is_valid_date,hasRank
from models import *
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


@app.route('/')
def home():
    return "Hello from the Python backend new!"


@app.route('/api/answer')
def get_answer():
    return jsonify({"answer": "This is the answer from the backend new!"})





if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000,debug=True)
    