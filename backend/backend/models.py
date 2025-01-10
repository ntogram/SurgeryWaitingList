from db import db
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Enum,Date,Text,Boolean,ForeignKey,SmallInteger
import datetime



# ORM for tables


class User(db.Model):
    __tablename__ = 'users'
    
    username = Column(String(255), primary_key=True, unique=True, nullable=False)
    password = Column(String(255), nullable=False)

class TokenBlacklist(db.Model):
    __tablename__ = 'token_blacklist'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    jti = db.Column(db.String(45), unique=True, nullable=False)  # JWT ID
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())



class Patient(db.Model):
    __tablename__ = 'patients'  # Specify the table name

    ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(45), nullable=False)
    surname = db.Column(db.String(45), nullable=False)
    fatherName = db.Column(db.String(45), nullable=False)
    age = db.Column(db.Integer, nullable=False) 
    property = db.Column(Enum('Μόνιμος Στρατιωτικός', 'Έφεδρος Στρατιωτικός', 
                               'Αστυνομικός', 'Απόστρατος', 
                               'Μέλος', 'Ιδιώτης'), nullable=True)
    officer = relationship("Officer", back_populates="patient", uselist=False)
    soldier = relationship("Soldier", back_populates="patient", uselist=False)
    surgeries = relationship("Surgery", back_populates="patient")

    __table_args__ = (
        db.UniqueConstraint('name', 'surname', 'fatherName', 'age', 'property', name='PATIENTDATA'),
    )

    def __repr__(self):
        return f'<Patient {self.name} {self.surname}>'
    




class Officer(db.Model):
    __tablename__ = 'officers'
    officerID = db.Column(db.Integer,db.ForeignKey('patients.ID'),primary_key=True)
    officerRank = db.Column(db.String(45),nullable=False)
    armyRank = db.Column(db.String(45),nullable=True)

    # Define relationship to Patient using string reference
    
    patient = relationship("Patient", back_populates="officer")


class Soldier(db.Model):
    __tablename__ = 'soldiers'
    
    soldierID = Column(Integer,ForeignKey('patients.ID'), primary_key=True, nullable=False)
    dischargeDate = Column(Date, nullable=False)

    # Assuming you have a Patient class defined elsewhere
    # This creates a relationship to the Patient model based on the foreign key constraint
    patient = relationship("Patient", back_populates="soldier",uselist=False)


class SurgeryType(db.Model):
    __tablename__ = 'surgerytypes'
    
    name = Column(String(255),primary_key=True,nullable=False, unique=True)
    severity = Column(Enum('Μικρή', 'Μεσαία', 'Μεγάλη', 'Πολύ Μεγάλη'), nullable=False)
    estimatedDuration = Column(SmallInteger(), nullable=False)
    surgeries = relationship("Surgery", back_populates="surgeryType")

class Surgery(db.Model):
    __tablename__ = 'surgeries'
    
    # Columns for surgeries table
    surgeryId = Column(Integer, primary_key=True, autoincrement=True)
    examDate = Column(Date, nullable=False)
    disease = Column(String(90), nullable=False)
    diseaseDescription = Column(Text, nullable=False)

    
    # Enum for organ
    organ = Column(Enum('Μύτη', 'Παραρρίνιοι κόλποι', 'Τράχηλος', 'Αυτί', 'Ρινοφάρυγγας', 'Υποφάρυγγας', 'Λάρυγγας','Στοματοφάρυγγας','Άλλη περιοχή'), nullable=False)
    
    # Foreign key references surgerytypes (surgeryTypeId)
    surgeryName = Column(String(255), ForeignKey('surgerytypes.name'), nullable=False)
    
    surgeryDate = Column(Date, nullable=True)
    comments = Column(Text)
   
    
    # Active and referral fields
    active = Column(Boolean, default=True)
    referral = Column(Boolean, default=False)
    
    # Foreign key references patients (patientId)
    patientId = Column(Integer, ForeignKey('patients.ID'), nullable=True)

    # Relationships
    patient = relationship("Patient", back_populates="surgeries",uselist=False)
    surgeryType = relationship("SurgeryType", back_populates="surgeries",uselist=False)



class OrganPropertyCombination(db.Model):
    __tablename__ = 'organ_property_combinations'  # The view name
    name = Column(String(20), primary_key=True)  # Assuming 'name' is a primary key (organName)
    property = Column(String(18), primary_key=True)  # Assuming 'property' is also part of the primary key









